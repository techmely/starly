import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import { z } from "zod";
import type { Http } from "@techmely/http";

export const runtimeEnvSchema = z.object({
  VERSION: z.string().default("1.0.0"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().default("techmely"),
  COOKIE_DOMAIN: z.string(),
  AXIOM_TOKEN: z.string().optional(),
  CLOUDFLARE_API_KEY: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),
  ENV: z.enum(["development", "staging", "production"]).default("development"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DEBUG: z.boolean().default(false),
  S3_ENDPOINT: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET: z.string(),
  CORS_ORIGIN: z.string(),
  CORS_ALLOW_HEADERS: z.string(),
  CORS_ALLOW_METHODS: z.string(),
  CORS_MAX_AGE: z.string().transform((v) => Number.parseInt(v)),
  CORS_CREDENTIALS: z.string(),
  // DO_RATELIMIT: z.custom<DurableObjectNamespace>((ns) => typeof ns === "object"),
  // DO_USAGE_LIMIT: z.custom<DurableObjectNamespace>((ns) => typeof ns === "object"),

  // LOGS: z.custom<Queue<any>>((ns) => typeof ns === "object").optional(),
  // ANALYTICS: z.custom<Queue<any>>((ns) => typeof ns === "object").optional(),
  // METRICS: z.custom<Queue<keyof MetricEventPort[]>>((ns) => typeof ns === "object").optional(),
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

export type AppVariables = {
  requestId: string;
  userId: string;
  container: ContainerServicesCtx;
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
