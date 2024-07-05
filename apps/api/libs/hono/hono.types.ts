import type { UserService } from "#root/contexts/identify-access/user/application/services/user.service";
import type { UserFromDecodedIdToken } from "@techmely/auth";
import type { HttpInstance } from "@techmely/http";
import type { UserModel } from "@techmely/starly-models";
import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import type { SocketAddress } from "bun";
import type { InferOutput } from "valibot";
import type { runtimeEnvSchema } from "./hono.schema";
import type { Context } from "hono";

export type AppEnv = InferOutput<typeof runtimeEnvSchema> & {
  IP: SocketAddress;
};

export type ContainerServicesCtx = {
  cache: any;
  logger: LoggerPort;
  analytics?: any;
  metrics?: MetricsPort;
  usageLimiter?: UsageLimiterPort;
  rateLimiter?: RateLimiterPort;
  http?: HttpInstance;
};

export type AppConfig = {
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
    origin: string | string[] | ((origin: string, c: Context) => string | undefined | null);
    allowMethods?: string[];
    allowHeaders?: string[];
    maxAge?: number;
    credentials?: boolean;
    exposeHeaders?: string[];
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
  userAgent: string;
  firebaseUser?: UserFromDecodedIdToken;
  user?: UserModel;

  services: {
    user: UserService;
  };
};

export type HonoEnv = {
  Bindings: AppEnv;
  Variables: AppVariables;
};
