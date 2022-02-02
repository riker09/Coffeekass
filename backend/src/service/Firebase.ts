import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// ATTENTION: Dependency to /frontend
import { environment } from '../../../frontend/src/environments/environment';

const firebaseApp = initializeApp(environment.firebase);

// Auth
const auth = getAuth(firebaseApp);
if (environment.useEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}

// Firestore
const firestore = getFirestore(firebaseApp);
if (environment.useEmulators) {
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

// Functions
const functions = getFunctions(firebaseApp);
if (environment.useEmulators) {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export { auth, firestore, functions };