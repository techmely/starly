import type { MetricEventPort } from "@techmely/types";
import { z } from "zod";

export const runtimeEnv = z.object({
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().default("techmely"),
  AXIOM_TOKEN: z.string().optional(),
  CLOUDFLARE_API_KEY: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),
  ENV: z.enum(["development", "preview", "production"]).default("development"),
  DO_RATELIMIT: z.custom<DurableObjectNamespace>((ns) => typeof ns === "object"),
  DO_USAGE_LIMIT: z.custom<DurableObjectNamespace>((ns) => typeof ns === "object"),

  LOGS: z.custom<Queue<any>>((ns) => typeof ns === "object").optional(),
  ANALYTICS: z.custom<Queue<any>>((ns) => typeof ns === "object").optional(),
  METRICS: z.custom<Queue<keyof MetricEventPort[]>>((ns) => typeof ns === "object").optional(),
});

export type AppEnv = z.infer<typeof runtimeEnv>;
export type AppVariables = {
  requestId: string;
  currentUserId: string;
};

export type HonoEnv = {
  Bindings: AppEnv;
  Variables: AppVariables;
};
