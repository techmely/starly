import { type AppEnv, runtimeEnvSchema } from "@techmely/hono";
import { config } from "dotenv";

// type EnvSchema = Output<typeof envsSchema>;

export let serverEnvs: AppEnv;

export function accessEnvs() {
  if (!serverEnvs) {
    const envPath = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
    const envs = config({ path: envPath }).parsed || {};

    const envParsed = runtimeEnvSchema.safeParse({ ...envs, ...envs });

    if (envParsed.success) {
      serverEnvs = envParsed.data;
    } else {
      const issues = envParsed.error.issues.map((i) => {
        return {
          reason: i.code,
          key: i.path,
          value: i.message,
        };
      });
      console.error(issues);
      throw new Error("Parsed env failed!");
    }
  }
  return serverEnvs;
}
