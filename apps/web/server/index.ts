import { Hono } from "hono";
import { compress } from "hono/compress";
import { timing } from "hono/timing";

import type { HonoEnv } from "@techmely/hono";
import { useVikeRouter } from "#root/modules/vike/vike.router";
import useViteMiddleware from "#root/modules/vite/vite.middleware";

// const envs = accessEnvs();

// const port = 9001;

const app = new Hono<HonoEnv>();
app.use(timing());
app.use(compress());
app.get("/ping", (c) => c.text("pong"));

await useViteMiddleware(app);

useVikeRouter(router);

export default app;
