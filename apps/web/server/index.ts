import { Hono } from "hono";
import { compress } from "hono/compress";
import { timing } from "hono/timing";

import type { HonoEnv } from "@techmely/hono";
import { commonContextMiddleware, secureHeaders } from "@techmely/hono";
import vikeMiddleware from "./middleware/vike";
import { accessEnvs } from "./utils/server-envs";

const envs = accessEnvs();

const app = new Hono<HonoEnv>();
app.use(commonContextMiddleware());
app.use(timing());
app.use(compress());
app.use(secureHeaders());
app.use(vikeMiddleware());

app.get("/ping", (c) => c.text("pong"));

export default app;
