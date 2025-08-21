use crate::AppState;
use axum::{extract::State, http::StatusCode, response::Html};
use chrono::Datelike;
use tera::Context;

pub async fn home_page(
    State(state): State<AppState>,
) -> Result<Html<String>, StatusCode> {
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
