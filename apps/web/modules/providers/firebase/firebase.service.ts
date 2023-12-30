import type { FirebaseOptions } from "firebase/app";
import {
  type Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { type Locale, baseLocale } from "#modules/locales/locales.utils";

let cachedAuth: Auth | null = null;

export async function ensureInitFirebaseAuth(locale: Locale) {
  if (cachedAuth) {
    return cachedAuth;
  }
  const firebaseConfig: FirebaseOptions = {
    apiKey: clientEnvs.firebase.apiKey,
    authDomain: clientEnvs.firebase.authDomain,
    projectId: clientEnvs.firebase.projectId,
    storageBucket: clientEnvs.firebase.storageBucket,
    appId: clientEnvs.firebase.appId,
    messagingSenderId: clientEnvs.firebase.messagingSenderId,
  };
  const { initializeApp } = await import("firebase/app");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
  auth.languageCode = locale;
  cachedAuth = auth;
  return auth;
}

export async function registerUserWithEmailAndPassword(email: string, password: string) {
  const auth = await ensureInitFirebaseAuth("en");
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    return newUser;
  } catch (e) {
    throw new Error(e?.code || e.message);
  }
}

export async function signInUserWithEmailAndPassword(email: string, password: string) {
  const auth = await ensureInitFirebaseAuth(baseLocale);
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(e?.code || e.message);
  }
}
