import { url, type InferOutput, boolean, object, optional, picklist, pipe, string } from "valibot";

export const appRuntimeEnvSchema = object({
  VITE_ENV: optional(picklist(["development", "staging", "production"]), "development"),
  VITE_NODE_ENV: optional(picklist(["development", "test", "production"], "development")),
  VITE_DEBUG: optional(boolean(), false),
  VITE_COOKIE_DOMAIN: string(),
  VITE_APP_VERSION: optional(string(), "1.0.0"),
  VITE_BASE_API_URL: pipe(string(), url()),
  VITE_HOST: pipe(string(), url()),

  NODE_ENV: optional(picklist(["development", "test", "production"], "development")),
});

export type AppRuntimeEnv = InferOutput<typeof appRuntimeEnvSchema>;
