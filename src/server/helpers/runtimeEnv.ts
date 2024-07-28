import { boolean, object, optional, picklist, string } from "valibot";

export const appRuntimeEnvSchema = object({
  VITE_ENV: optional(picklist(["development", "staging", "production"]), "development"),
  VITE_NODE_ENV: optional(picklist(["development", "test", "production"], "development")),
  VITE_DEBUG: optional(boolean(), false),
  VITE_COOKIE_DOMAIN: string(),
  VITE_VERSION: optional(string(), "1.0.0"),

  NODE_ENV: optional(picklist(["development", "test", "production"], "development")),
});
