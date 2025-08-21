extern crate tera;
use axum::response::Html;
use axum::{
    Router,
    extract::{
        State,
        ws::{Message, WebSocket, WebSocketUpgrade},
    },
    http::StatusCode,
    routing::get,
};
use chrono::Datelike;
use std::net::SocketAddr;
use std::sync::Arc;
use tera::{Context, Tera};
use tokio::sync::RwLock;
use tower_http::services::ServeDir;

#[cfg(feature = "dev")]
use futures::stream::StreamExt;
#[cfg(feature = "dev")]
use notify::{EventKind, RecursiveMode, Watcher};
#[cfg(feature = "dev")]
use std::path::Path;
#[cfg(feature = "dev")]
use std::pin::Pin;
#[cfg(feature = "dev")]
use tokio::sync::broadcast;
#[cfg(feature = "dev")]
use tokio::sync::broadcast::error::RecvError::Closed;
#[cfg(feature = "dev")]
use tokio::sync::broadcast::error::RecvError::Lagged;
#[cfg(feature = "dev")]
use tokio::time::{self, Duration, Sleep};

#[derive(Clone)]
pub struct AppState {
    pub templater: Arc<RwLock<tera::Tera>>,
    #[cfg(feature = "dev")]
    pub reload_tx: Option<broadcast::Sender<()>>,
}

#[tokio::main]
async fn main() {
    let templater = match Tera::new("templates/**/*.html") {
        Ok(t) => t,
        Err(e) => {
            println!("Parsing error(s): {}", e);
            ::std::process::exit(1);
        }
    };

    #[cfg(feature = "dev")]
    let (reload_tx, _) = broadcast::channel::<()>(16);
    let (shutdown_tx, mut shutdown_rx) = broadcast::channel::<()>(1);
    let shutdown_tx_clone = shutdown_tx.clone();

    tokio::spawn(async move {
        tokio::signal::ctrl_c()
            .await
            .expect("Failed to listen for Ctrl+C");
        println!("Ctrl-C received, initiating graceful shutdown...");
        let _ = shutdown_tx_clone.send(());
    });

    let app_state = AppState {
        templater: Arc::new(RwLock::new(templater)),
        #[cfg(feature = "dev")]
        reload_tx: Some(reload_tx.clone()),
    };

    let static_files_service = ServeDir::new("static").append_index_html_on_directories(true);

    let mut app = Router::new()
        .route("/", get(home_page))
        .nest_service("/static", static_files_service);

    #[cfg(feature = "dev")]
    {
        app = app.route("/ws", get(ws_handler));

        let watcher_tx = reload_tx.clone();
        let watcher_templater_arc = app_state.templater.clone();
        let watcher_shutdown_rx = shutdown_tx.subscribe();
        tokio::spawn(async move {
            if let Err(e) =
                setup_file_watcher(watcher_tx, watcher_templater_arc, watcher_shutdown_rx).await
            {
                eprintln!("File watcher error: {:?}", e);
            }
        });

        println!("Dev mode: Live reload enabled and file watcher started!");
    }

    // TODO: make this idiomatic without `?`. Maybe extract this?
    let port = match std::env::var("AXUM_PORT") {
        Ok(_port) => match _port.parse::<u16>() {
            Ok(__port) => __port,
            _ => 42069,
        },
        _ => 42069,
    };

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();

    println!("Listening on http://{}", addr);

    axum::serve(listener, app.with_state(app_state))
        .with_graceful_shutdown(async move {
            shutdown_rx.recv().await.ok();
            println!("Axum server shutting down gracefully.");
        })
        .await
        .unwrap();

    println!("Server stopped successfully.");
}

pub async fn home_page(State(state): State<AppState>) -> Result<Html<String>, StatusCode> {
    let mut context = Context::new();
    context.insert("year", &chrono::Utc::now().year());

    #[cfg(feature = "dev")]
    {
        context.insert("dev_mode", &true);
    }

    let templater_guard = state.templater.read().await;
    let rendered = templater_guard.render("index.html", &context);

    match rendered {
        Ok(r) => Ok(Html::<String>(r)),
        Err(e) => {
            eprintln!("Template rendering error: {:?}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

#[cfg(feature = "dev")]
async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
) -> axum::response::Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.reload_tx.unwrap()))
}

#[cfg(feature = "dev")]
async fn handle_socket(mut socket: WebSocket, reload_tx: broadcast::Sender<()>) {
    let mut rx = reload_tx.subscribe();

    loop {
        use axum::extract::ws::Utf8Bytes;

        tokio::select! {

            msg = rx.recv() => {
                match msg {
                    Ok(_) => {
                        if socket.send(Message::Text(Utf8Bytes::from("reload"))).await.is_err() {
                            println!("WebSocket client disconnected during reload send.");
                            break;
                        }
                    }
                    Err(Lagged(skipped)) => {
                        eprintln!("WebSocket receiver lagged, skipped {} messages.", skipped);
                    }
                    Err(Closed) => {
                        println!("Broadcast channel closed, stopping WebSocket handler.");
                        break;
                    }
                }
            }

            msg = socket.next() => {
                if let Some(msg) = msg {
                    if let Ok(msg) = msg {
                        match msg {
                            Message::Text(t) => {  println!("Client sent: {}", t); }
                            Message::Binary(b) => {  println!("Client sent binary: {:?}", b);  }
                            Message::Ping(_) => {  println!("Client pinged");  }
                            Message::Pong(_) => {  println!("Client ponged");  }
                            Message::Close(_) => {
                                println!("Client initiated close.");
                                break;
                            }
                        }
                    } else {
                        println!("WebSocket receive error or client disconnected.");
                        break;
                    }
                } else {
                    println!("WebSocket client disconnected.");
                    break;
                }
            }
        }
    }
}

#[cfg(feature = "dev")]
async fn setup_file_watcher(
    tx: broadcast::Sender<()>,
    templater_arc: Arc<RwLock<tera::Tera>>,
    mut shutdown_rx: broadcast::Receiver<()>,
) -> Result<(), Box<dyn std::error::Error>> {
    let (notify_tx, mut notify_rx) = tokio::sync::mpsc::channel(1);

    let mut watcher = notify::recommended_watcher(move |res| {
        if let Err(e) = notify_tx.blocking_send(res) {
            eprintln!("Error sending notify event: {:?}", e);
        }
    })?;

    watcher.watch(Path::new("templates"), RecursiveMode::Recursive)?;
    watcher.watch(Path::new("static"), RecursiveMode::Recursive)?;

    println!("Watching 'templates/' and 'static/' for changes...");

    let debounce_duration = Duration::from_millis(100);
    let mut debounce_sleep: Option<Pin<Box<Sleep>>> = None;

    loop {
        tokio::select! {
            Some(res) = notify_rx.recv() => {
                match res {
                    Ok(event) => {
                        if matches!(event.kind, EventKind::Modify(_) | EventKind::Create(_) | EventKind::Remove(_)) {
                            if debounce_sleep.is_none() {
                                println!("File change detected. Debouncing for {}ms...", debounce_duration.as_millis());
                                debounce_sleep = Some(Box::pin(time::sleep(debounce_duration)));
                            } else {
                                debounce_sleep.as_mut().unwrap().as_mut().reset(time::Instant::now() + debounce_duration);
                            }
                        }
                    }
                    Err(e) => eprintln!("Watch error: {:?}", e),
                }
            }

            _ = async {
                if let Some(sleep_future) = debounce_sleep.as_mut() {
                    sleep_future.await
                } else {
                    std::future::pending().await
                }

            } => {
                println!("Debounce timer fired. Reloading Tera templates.");
                let mut templater_guard = templater_arc.write().await;
                match templater_guard.full_reload() {
                    Ok(_) => println!("Tera templates reloaded successfully."),
                    Err(e) => eprintln!("Error reloading Tera templates: {:?}", e),
                }
                drop(templater_guard);
                if tx.send(()).is_err() {
                    eprintln!("Error sending reload signal to broadcast channel (no receivers?).");
                }
                debounce_sleep = None;
            }

            _ = shutdown_rx.recv() => {
                println!("File watcher received shutdown signal, stopping.");
                break;
            }
        }
    }
    Ok(())
}
