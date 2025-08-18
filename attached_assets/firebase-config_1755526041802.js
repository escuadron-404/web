// Firebase Configuration
// Replace these values with your actual Firebase project configuration

const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase with error handling
try {
    // Check if Firebase is available
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
    } else {
        console.warn('Firebase SDK not loaded. Running in demo mode.');
    }
} catch (error) {
    console.error('Error initializing Firebase:', error);
    console.warn('Running in demo mode without Firebase authentication.');
}

// Initialize Firebase Auth with fallback
let auth = null;
try {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        auth = firebase.auth();
        console.log('Firebase Auth initialized');
    }
} catch (error) {
    console.error('Error initializing Firebase Auth:', error);
}

// Export for use in other files
window.firebaseAuth = auth;

// Demo mode indicator
window.isDemoMode = !auth;