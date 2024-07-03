import * as v from "valibot";

export const runtimeEnvSchema = v.object({
  ENV: v.optional(v.picklist(["development", "staging", "production"]), "development"),
  NODE_ENV: v.optional(v.picklist(["development", "test", "production"]), "development"),
  DEBUG: v.optional(v.boolean(), false),
  COOKIE_DOMAIN: v.string(),
  AXIOM_TOKEN: v.optional(v.string()),
  VERSION: v.optional(v.string(), "1.0.0"),

  DB_HOST: v.string(),
  DB_PORT: v.pipe(
    v.string(),
    v.transform((p) => +p),
  ),
  DB_USER: v.string(),
  DB_PASSWORD: v.string(),
  DB_DATABASE: v.optional(v.string()),
  DB_SSL: v.string(),

  FIREBASE_API_KEY: v.string(),
  FIREBASE_PROJECT_ID: v.string(),
  ADMIN_AUTH_IDS: v.string(),

  S3_ENDPOINT: v.string(),
  S3_ACCESS_KEY_ID: v.string(),
  S3_SECRET_ACCESS_KEY: v.string(),
  S3_BUCKET: v.string(),
  S3_REGION: v.string(),
  S3_GET_GCS_IMAGE_SERVING_ENDPOINT: v.string(),

  CORS_ORIGIN: v.string(),
  CORS_ALLOW_HEADERS: v.string(),
  CORS_ALLOW_METHODS: v.string(),
  CORS_MAX_AGE: v.pipe(
    v.string(),
    v.transform((p) => +p),
  ),
  CORS_CREDENTIALS: v.string(),
});
