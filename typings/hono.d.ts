import type { UserModel } from "@techmely/starly-models";
import type { UserRecord } from "firebase-admin/auth";
import type { InferOutput } from "valibot";
import type { clientRuntimeEnvSchema } from "#root/shared/helpers/client-envs";

declare global {
  export type AppEnv = InferOutput<typeof clientRuntimeEnvSchema> & {
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
