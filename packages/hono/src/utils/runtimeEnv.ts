import type { UserFromDecodedIdToken } from "@techmely/auth";
import type { HttpInstance } from "@techmely/http";
import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import type { SocketAddress } from "bun";
import { type Output, boolean, object, optional, picklist, string, transform } from "valibot";

export const serverRuntimeEnvSchema = object({
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

export const clientRuntimeEnvSchema = object({
  VITE_ENV: optional(picklist(["development", "staging", "optional(production"]), "development"),
  VITE_NODE_ENV: optional(picklist(["development", "test", "optional(production"], "development")),
  VITE_DEBUG: optional(boolean(), false),
  VITE_COOKIE_DOMAIN: string(),
  VITE_VERSION: optional(string(), "1.0.0"),
});

export type AppEnv = Output<typeof serverRuntimeEnvSchema> & {
  IP: SocketAddress;
};

export type ContainerServicesCtx = {
  cache: any;
  db: any;
  logger: LoggerPort;
  analytics?: any;
  metrics?: MetricsPort;
  usageLimiter?: UsageLimiterPort;
  rateLimiter?: RateLimiterPort;
  http?: HttpInstance;
};

export type AppConfig = {
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    // ssl: { rejectUnauthorized: boolean } | boolean;
  };
  firebase: {
    apiKey: string;
    projectId: string;
  };
  storage: {
    s3: {
      bucket: string;
      accessKeyId: string;
      secretAccessKey: string;
      endpoint: string;
      region: string;
      getGcsImageServingEndpoint: string;
    };
  };
  cors: {
    origin: string[];
    allowHeaders: string[];
    allowMethods: string[];
    maxAge: number;
    credentials: string;
  };
  admin: {
    authIds: string[];
  };
};

export type AppVariables = {
  requestId: string;
  container: ContainerServicesCtx;
  config: AppConfig;
  /**
   * IP address or region information
   */
  location?: string;
  userAgent?: string;
  firebaseUser: UserFromDecodedIdToken;
};

export type HonoEnv = {
  Bindings: AppEnv;
  Variables: AppVariables;
};
