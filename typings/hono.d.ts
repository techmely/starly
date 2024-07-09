import type { appRuntimeEnvSchema } from "#root/server/helpers/runtimeEnv";
import type { UserModel } from "@techmely/starly-models";
import type { UserRecord } from "firebase-admin/auth";
import type { InferOutput } from "valibot";

declare global {
  export type AppEnv = InferOutput<typeof appRuntimeEnvSchema> & {
    IP: SocketAddress;
  };

  export type AppVariables = {
    firebase: {
      apiKey: string;
      projectId: string;
    };
    location?: string;
    userAgent: string;
    user?: UserModel;
    firebaseUser?: UserRecord;
  };

  export type HonoEnv = {
    Bindings: AppEnv;
    Variables: AppVariables;
  };
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export type {};
