import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(__dirname, '../service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

const app = initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  const listUsersResult = await auth.listUsers(10);
  if (listUsersResult.users.length === 0) {
      console.log("No users found in Auth.");
      return;
  }
  
  for (const userRecord of listUsersResult.users) {
    console.log(`Found user: ${userRecord.email} (${userRecord.uid})`);
    
    // Wipe user
    console.log(`Wiping ${userRecord.email}...`);
    await auth.deleteUser(userRecord.uid);
    console.log(`✅ Auth user ${userRecord.uid} deleted.`);

    const collections = [
      "kp_elite_users",
      "kp_elite_student_progress",
    ];

    for (const col of collections) {
      await db.collection(col).doc(userRecord.uid).delete();
      console.log(`✅ Deleted ${col}/${userRecord.uid}`);
    }

    const userIdCols = ["kp_elite_intake_applications", "kp_elite_swing_submissions", "kp_elite_session_history", "kp_elite_bookmarks"];
    for (const col of userIdCols) {
      const snap = await db.collection(col).where("userId", "==", userRecord.uid).get();
      if (!snap.empty) {
        const batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`✅ Deleted ${snap.size} docs from ${col}`);
      }
    }
  }
  console.log("🎉 All test users wiped! Ready for a clean slate.");
}
run().catch(console.error);
