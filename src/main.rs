extern crate tera;
use axum::response::Html;
use axum::{extract::State, http::StatusCode};
use chrono::Datelike;
use std::net::SocketAddr;
use std::sync::Arc;
use tera::{Context, Tera};
// TODO: implement structured json logs
// use tracing::Level;
// use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use tower_http::services::ServeDir;

use axum::{Router, routing::get};

#[derive(Clone)]
pub struct AppState {
    pub templater: Arc<tera::Tera>,
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
    let app_state = AppState {
        templater: Arc::new(templater),
    };

    let static_files_service = ServeDir::new("static").append_index_html_on_directories(true);

    let app = Router::new()
        .route("/", get(home_page))
        .nest_service("/static", static_files_service)
        .with_state(app_state);

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

    axum::serve(listener, app).await.unwrap();
}

pub async fn home_page(State(state): State<AppState>) -> Result<Html<String>, StatusCode> {
    let mut context = Context::new();
    context.insert("year", &chrono::Utc::now().year());
    let rendered = state.templater.render("index.html", &context);

    match rendered {
        Ok(r) => Ok(Html::<String>(r)),
        _ => Err(StatusCode::BAD_REQUEST),
    }
}
