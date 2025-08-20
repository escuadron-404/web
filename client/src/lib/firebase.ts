// Firebase Configuration and Initialization
import { useToast } from "@/hooks/use-toast";

// Firebase configuration - using environment variables with fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "escuadron404-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "escuadron404-demo",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "escuadron404-demo.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

// Firebase Auth instance
let auth: any = null;
let isDemoMode = true;

// Initialize Firebase with error handling
try {
  // Check if Firebase is available globally (from CDN)
  if (typeof (window as any).firebase !== "undefined") {
    const firebase = (window as any).firebase;
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    isDemoMode = false;
    console.log("Firebase initialized successfully");
  } else {
    console.warn("Firebase SDK not loaded. Running in demo mode.");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  console.warn("Running in demo mode without Firebase authentication.");
}

export { auth, isDemoMode };
export default auth;
