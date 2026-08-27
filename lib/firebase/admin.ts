import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage, Storage } from "firebase-admin/storage";

let adminApp: App;

if (!getApps().length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kota-reuse";
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kota-reuse.firebasestorage.app",
      });
    } catch {
      adminApp = initializeApp({
        projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kota-reuse.firebasestorage.app",
      });
    }
  } else {
    adminApp = initializeApp({
      projectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kota-reuse.firebasestorage.app",
    });
  }
} else {
  adminApp = getApps()[0];
}

export const adminDb: Firestore = getFirestore(adminApp);
export const adminAuth: Auth = getAuth(adminApp);
export const adminStorage: Storage = getStorage(adminApp);
export { adminApp };
