import { Hono } from "hono";
import { timing } from "hono/timing";

import type { HonoEnv } from "@starly/models";
import { clientRuntimeEnvSchema, commonContext, secureHeadersMiddleware } from "@starly/models";
import vikeMiddleware from "./middleware/vike";

const app = new Hono<HonoEnv>();
app.use(commonContext());
app.use(timing());
app.use(secureHeadersMiddleware());
app.use(vikeMiddleware());
/*
 * Bun currently not support CompressionStream yet
 * @see https://github.com/oven-sh/bun/issues/159
 */
// app.use(compress());

app.get("/ping", (c) => c.text("pong"));
app.get("/.well-know/security", (c) => {
  // const appPath = isProd ? rootPath : path.resolve(dirname, "..");

  // const defaultAppleDeveloper = await readFile(path.resolve(appPath, "public/apple-developer.txt"));
  return c.text("");
});

Bun.serve({
  port: 3000,
  fetch(req, server) {
    const parsedEnv = clientRuntimeEnvSchema.safeParse(Bun.env);
    if (!parsedEnv.success) {
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.error,
        },
        { status: 500 },
      );
    }
    return app.fetch(req, { IP: server.requestIP(req), ...parsedEnv.data });
  },
});
