import type { UserService } from "#root/contexts/identify-access/user/application/services/user.service";
import type { UserFromDecodedIdToken } from "@techmely/auth";
import type { HttpInstance } from "@techmely/http";
import type { UserModel } from "@techmely/models";
import type { LoggerPort, MetricsPort, RateLimiterPort, UsageLimiterPort } from "@techmely/types";
import type { SocketAddress } from "bun";
import type { Output } from "valibot";
import type { runtimeEnvSchema } from "./hono.schema";

export type AppEnv = Output<typeof runtimeEnvSchema> & {
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
