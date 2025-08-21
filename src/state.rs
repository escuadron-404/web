use std::sync::Arc;
use tokio::sync::RwLock;

#[cfg(feature = "dev")]
use tokio::sync::broadcast;

#[derive(Clone)]
pub struct AppState {
    pub templater: Arc<RwLock<tera::Tera>>,
    #[cfg(feature = "dev")]
    pub reload_tx: Option<broadcast::Sender<()>>,
}
