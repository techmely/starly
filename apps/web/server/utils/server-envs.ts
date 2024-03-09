import { type AppEnv, runtimeEnvSchema } from "@techmely/hono";
import { config } from "dotenv";

// type EnvSchema = Output<typeof envsSchema>;

export let serverEnvs: AppEnv;

export function accessEnvs() {
  if (!serverEnvs) {
    const envs = config().parsed || {};
    const extendEnvs =
      config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` }).parsed || {};

    const envParsed = runtimeEnvSchema.safeParse({ ...envs, ...extendEnvs });

    if (envParsed.success) {
      serverEnvs = envParsed.data;
    } else {
      const issues = envParsed.error.issues.map((i) => {
        return {
          reason: i.code,
          key: i.code,
          value: i.message,
        };
      });
      console.error(issues);
      throw new Error("Parsed env failed!");
    }
  }
  return serverEnvs;
}
