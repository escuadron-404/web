#[cfg(feature = "dev")]
use crate::state::AppState;
use axum::extract::{
    State,
    ws::{Message, WebSocket, WebSocketUpgrade},
};
use futures::stream::StreamExt;
use notify::{EventKind, RecursiveMode, Watcher};
use std::path::Path;
use std::pin::Pin;
use std::sync::Arc;
use tokio::sync::RwLock;
use tokio::sync::broadcast;
use tokio::sync::broadcast::error::RecvError::Closed;
use tokio::sync::broadcast::error::RecvError::Lagged;
use tokio::time::{self, Duration, Sleep};

pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
) -> axum::response::Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.reload_tx.unwrap()))
}

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

pub async fn setup_file_watcher(
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
