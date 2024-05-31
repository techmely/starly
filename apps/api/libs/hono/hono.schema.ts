import { boolean, object, optional, picklist, string, transform } from "valibot";

export const runtimeEnvSchema = object({
  ENV: optional(picklist(["development", "staging", "optional(production"]), "development"),
  NODE_ENV: optional(picklist(["development", "test", "optional(production"]), "development"),
  DEBUG: optional(boolean(), false),
  COOKIE_DOMAIN: string(),
  AXIOM_TOKEN: optional(string()),
  VERSION: optional(string(), "1.0.0"),

  DB_HOST: string(),
  DB_PORT: transform(string(), (p) => +p),
  DB_USER: string(),
  DB_PASSWORD: string(),
  DB_NAME: optional(string(), "techmely"),
  DB_SSL: string(),

  FIREBASE_API_KEY: string(),
  FIREBASE_PROJECT_ID: string(),
  ADMIN_AUTH_IDS: string(),

  S3_ENDPOINT: string(),
  S3_ACCESS_KEY_ID: string(),
  S3_SECRET_ACCESS_KEY: string(),
  S3_BUCKET: string(),
  S3_REGION: string(),
  S3_GET_GCS_IMAGE_SERVING_ENDPOINT: string(),

  CORS_ORIGIN: string(),
  CORS_ALLOW_HEADERS: string(),
  CORS_ALLOW_METHODS: string(),
  CORS_MAX_AGE: transform(string(), (v) => +v),
  CORS_CREDENTIALS: string(),
});
