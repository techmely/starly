import { type FirebaseApp, deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeG5--mhXahv0b5eDkHYfDGnsMDOwnYsc",
  authDomain: "techmely-starly.firebaseapp.com",
  projectId: "techmely-starly",
  storageBucket: "techmely-starly.appspot.com",
  messagingSenderId: "295192814284",
  appId: "1:295192814284:web:d46099c1df7f0dcbb25869",
};

let firebaseApp: FirebaseApp | undefined;
// create a singleton client side firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}

const auth = getAuth(firebaseApp);

// As httpOnly cookies are to be used, do not persist any state client side.
// `inMemoryPersistence` is an implementation of Persistence of type 'NONE'.
auth.setPersistence(inMemoryPersistence);
