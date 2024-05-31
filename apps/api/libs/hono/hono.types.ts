import type { UserFromDecodedIdToken } from "@techmely/auth";
import type { HttpInstance } from "@techmely/http";
import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import type { SocketAddress } from "bun";
import type { Kysely } from "kysely";
import type { Output } from "valibot";
import type { runtimeEnvSchema } from "./hono.schema";
import type { UserService } from "#root/contexts/identify-access/user/application/services/user.service";

export type AppEnv = Output<typeof runtimeEnvSchema> & {
  IP: SocketAddress;
};

export type ContainerServicesCtx<Database> = {
  cache: any;
  db: Kysely<Database>;
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

export type AppVariables<Database> = {
  requestId: string;
  container: ContainerServicesCtx<Database>;
  config: AppConfig;
  /**
   * IP address or region information
   */
  location?: string;
  userAgent: string;
  firebaseUser: UserFromDecodedIdToken;
  userService: UserService;
};

export type HonoEnv<Database = any> = {
  Bindings: AppEnv;
  Variables: AppVariables<Database>;
};
