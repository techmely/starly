/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_MIXPANEL_TOKEN: string;
  readonly VITE_MIXPANEL_HOST: string;
  readonly VITE_HOST: string;

  readonly VITE_SENTRY_DSN: string;

  readonly VITE_MIXPANEL_PROJECT_TOKEN: string;
  readonly VITE_MIXPANEL_PROXY_DOMAIN: string;

  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
