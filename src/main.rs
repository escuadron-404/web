extern crate tera;
#[cfg(feature = "dev")]
pub mod dev;
pub mod handlers;
pub mod state;

#[cfg(feature = "dev")]
use crate::dev::{setup_file_watcher, ws_handler};

use crate::state::AppState;
use axum::{Router, routing::get};
use std::{net::SocketAddr, sync::Arc};
use tera::Tera;
use tokio::sync::{RwLock, broadcast};
use tower_http::services::ServeDir;

const DEFAULT_PORT: u16 = 42069;

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

    let static_files_service =
        ServeDir::new("static").append_index_html_on_directories(true);

    #[allow(unused_mut)]
    let mut app = Router::new()
        .route("/", get(handlers::home_page))
        .nest_service("/static", static_files_service);

    #[cfg(feature = "dev")]
    {
        app = app.route("/ws", get(ws_handler));

        let watcher_tx = reload_tx.clone();
        let watcher_templater_arc = app_state.templater.clone();
        let watcher_shutdown_rx = shutdown_tx.subscribe();
        tokio::spawn(async move {
            if let Err(e) = setup_file_watcher(
                watcher_tx,
                watcher_templater_arc,
                watcher_shutdown_rx,
            )
            .await
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
            _ => DEFAULT_PORT,
        },
        _ => DEFAULT_PORT,
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
