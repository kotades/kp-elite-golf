export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCAzayr2LOT64lUz1IusMsI7kMWEC8Di8M",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kota-reuse.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kota-reuse",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kota-reuse.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "551190616453",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:551190616453:web:e2f6e53b316e1afe658cec",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PVGN0389BD",
};
