import { type App, applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let firebaseAdmin: App | undefined;

const apps = getApps();

if (!apps.length) {
  firebaseAdmin = initializeApp({
    credential: applicationDefault(),
  });
} else {
  firebaseAdmin = getApp();
}

export { firebaseAdmin, getAuth };
