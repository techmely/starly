import { Hono } from "hono";
// import { compress } from "hono/compress";
import { timing } from "hono/timing";

import type { HonoEnv } from "@techmely/hono";
import { serverRuntimeEnvSchema } from "@techmely/hono";
import { commonContext, secureHeadersMiddleware } from "@techmely/hono";
import { globalHandleError } from "./libs/error/global.handle-error";
import { initApp } from "./libs/middlewares/init";

const app = new Hono<HonoEnv>();
app.use(initApp());
app.use(commonContext());
app.use(timing());
/*
 * Bun currently not support CompressionStream yet
 * @see https://github.com/oven-sh/bun/issues/159
 */
// app.use(compress());
app.use(secureHeadersMiddleware());

app.get("/", (c) => {
  return c.json({ data: "Welcome to the Techmely API" });
});
app.get("/ping", (c) => c.text("pong"));

app.get("/routers", (c) => {
  return c.json(
    app.routes.map((r) => ({
      method: r.method,
      path: r.path,
    })),
  );
});

app.onError(globalHandleError);

Bun.serve({
  port: 3000,
  fetch(req, server) {
    const parsedEnv = serverRuntimeEnvSchema.safeParse(Bun.env);
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
