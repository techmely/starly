import { Hono } from "hono";
import { compress } from "hono/compress";
import { timing } from "hono/timing";

import type { HonoEnv } from "@techmely/hono";
import { runtimeEnvSchema } from "@techmely/hono";
import { commonContextMiddleware, secureHeaders } from "@techmely/hono";
import { globalHandleError } from "./modules/error/global.handle-error";

const app = new Hono<HonoEnv>();
app.use(commonContextMiddleware());
app.use(timing());
app.use(compress());
app.use(secureHeaders());

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

export default {
  port: 3000,
  fetch: app.fetch,
};

Bun.serve({
  fetch(req, server) {
    const parsedEnv = runtimeEnvSchema.safeParse(Bun.env);
    if (!parsedEnv.success) {
      return Response.json({});
    }
    return app.fetch(req, { ip: server.requestIP(req), ...parsedEnv.data });
  },
});
