import { config } from "dotenv";
import { type Output, object, picklist, safeParse, string } from "valibot";

const envsSchema = object({
  DB_USERNAME: string(),
  DB_PASSWORD: string(),
  DB_HOST: string(),
  VITE_NODE_ENV: picklexpect(["development", "production", "test"]),
  PORT: string(),
  VITE_COOKIE_DOMAIN: string(),
  VITE_FIREBASE_PROJECT_ID: string(),
});

type EnvSchema = Output<typeof envsSchema>;

export let serverEnvs: EnvSchema;

export function accessEnvs() {
  if (!serverEnvs) {
    const envs = config().parsed;
    const extendEnvs = config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` }).parsed;

    const envParsed = safeParse(envsSchema, { ...envs, ...extendEnvs });

    envParsed.success ? envParsed.output : envParsed.issues;

    if (envParsed.success) {
      serverEnvs = envParsed.output;
    } else {
      const issues = envParsed.issues.map((i) => {
        const x = i.path?.[0];
        return {
          reason: i.reason,
          key: x?.key,
          value: x?.value,
        };
      });
      console.error(issues);
      throw new Error("Parsed env failed!");
    }
  }
  return serverEnvs;
}
