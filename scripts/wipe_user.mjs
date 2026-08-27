import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(__dirname, '../service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ ERROR: service-account.json not found in the root directory!");
  console.error("Please download it from Firebase Console -> Project Settings -> Service Accounts, rename it to 'service-account.json', and place it in the saas-app folder.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);
const db = getFirestore(app);

const email = process.argv[2];
if (!email) {
  console.error("Please provide an email to wipe: node scripts/wipe_user.mjs myemail@example.com");
  process.exit(1);
}

async function wipeUser() {
  try {
    const user = await auth.getUserByEmail(email);
    console.log(`Found user: ${user.uid}. Deleting from Auth...`);
    await auth.deleteUser(user.uid);
    console.log("✅ Auth user deleted.");

    const collections = [
      "kp_elite_users",
      "kp_elite_student_progress",
    ];

    for (const col of collections) {
      await db.collection(col).doc(user.uid).delete();
      console.log(`✅ Deleted ${col}/${user.uid}`);
    }

    const userIdCols = ["kp_elite_intake_applications", "kp_elite_swing_submissions", "kp_elite_session_history", "kp_elite_bookmarks"];
    for (const col of userIdCols) {
      const snap = await db.collection(col).where("userId", "==", user.uid).get();
      if (!snap.empty) {
        const batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`✅ Deleted ${snap.size} docs from ${col}`);
      }
    }
    
    const intakeSnap = await db.collection("kp_elite_intake_applications").where("email", "==", email).get();
    if (!intakeSnap.empty) {
        const batch = db.batch();
        intakeSnap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`✅ Deleted ${intakeSnap.size} stray docs from intake_applications by email`);
    }

    console.log("🎉 Wipe complete!");
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.log("⚠️ User not found in Auth. Checking Firestore anyway...");
      const intakeSnap = await db.collection("kp_elite_intake_applications").where("email", "==", email).get();
      if (!intakeSnap.empty) {
          const batch = db.batch();
          intakeSnap.docs.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
          console.log(`✅ Deleted ${intakeSnap.size} docs from intake_applications by email`);
      }
    } else {
      console.error(err);
    }
  }
}

wipeUser();
