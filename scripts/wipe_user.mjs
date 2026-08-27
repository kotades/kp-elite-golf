import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// In a real environment we'd use a service account key, but here we can try to use ADC (Application Default Credentials)
// if GCP auth is set up, otherwise we can just use the user's browser for deletion.
// Actually, I can't guarantee ADC is set up for `kota-reuse`. The user might not have `GOOGLE_APPLICATION_CREDENTIALS`.
