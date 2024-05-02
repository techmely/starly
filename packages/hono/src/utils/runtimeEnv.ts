import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import { z } from "zod";
import type { Http } from "@techmely/http";

export const runtimeEnvSchema = z.object({
  ENV: z.enum(["development", "staging", "production"]).default("development"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DEBUG: z.boolean().default(false),
  COOKIE_DOMAIN: z.string(),
  AXIOM_TOKEN: z.string().optional(),
  VERSION: z.string().default("1.0.0"),

  DB_HOST: z.string(),
  DB_PORT: z.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().default("techmely"),
  DB_SSL: z.string(),

  FIREBASE_API_KEY: z.string(),
  FIREBASE_PROJECT_ID: z.string(),

  S3_ENDPOINT: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET: z.string(),
  S3_REGION: z.string(),
  S3_GET_GCS_IMAGE_SERVING_ENDPOINT: z.string(),

  CORS_ORIGIN: z.string(),
  CORS_ALLOW_HEADERS: z.string(),
  CORS_ALLOW_METHODS: z.string(),
  CORS_MAX_AGE: z.string().transform((v) => +v),
  CORS_CREDENTIALS: z.string(),
});

export type AppEnv = z.infer<typeof runtimeEnvSchema> & {
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
  http?: Http;
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
};

export type AppVariables = {
  requestId: string;
  userId: string;
  container: ContainerServicesCtx;
  config: AppConfig;
  /**
   * IP address or region information
   */
  location?: string;
  userAgent?: string;
};

export type HonoEnv = {
  Bindings: AppEnv;
  Variables: AppVariables;
};
