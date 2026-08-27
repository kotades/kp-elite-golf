export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_DUMMY_KEY_FOR_BUILD_ONLY_000000",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "0000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:0000000000:web:dummy",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-DUMMY",
};
