import { boolean, object, optional, picklist, string } from "valibot";

export const runtimeEnvSchema = object({
  VITE_ENV: optional(picklist(["development", "staging", "optional(production"]), "development"),
  VITE_NODE_ENV: optional(picklist(["development", "test", "optional(production"], "development")),
  VITE_DEBUG: optional(boolean(), false),
  VITE_COOKIE_DOMAIN: string(),
  VITE_VERSION: optional(string(), "1.0.0"),
});
