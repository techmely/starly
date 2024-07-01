import { Hono } from "hono";
// import { compress } from "hono/compress";
import { timing } from "hono/timing";

import { commonContext, secureHeadersMiddleware } from "@techmely/hono";
import { safeParse } from "valibot";
import { accountRouter } from "./contexts/identify-access/user/infras/http/routers/account.router";
import { userRouter } from "./contexts/identify-access/user/infras/http/routers/user.router";
import { globalHandleError } from "./libs/error/global.handle-error";
import { runtimeEnvSchema } from "./libs/hono/hono.schema";
import type { HonoEnv } from "./libs/hono/hono.types";
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
  return c.json({ data: "Welcome to the Starly API" });
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

app.route("/api/v1/auth", accountRouter);
app.route("/api/v1/users", userRouter);

app.onError(globalHandleError);

Bun.serve({
  port: 3000,
  fetch(req, server) {
    const parsedEnv = safeParse(runtimeEnvSchema, Bun.env);
    if (!parsedEnv.success) {
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.issues[0],
        },
        { status: 500 },
      );
    }
    return app.fetch(req, { IP: server.requestIP(req), ...parsedEnv.output });
  },
});
