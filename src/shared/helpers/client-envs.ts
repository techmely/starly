export const clientEnvs = Object.freeze({
  isNodeDev: import.meta.env.DEV,
  isDev: import.meta.env.VITE_ENV === "development",
  cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  },
});
