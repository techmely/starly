import type { HonoEnv } from "@techmely/hono";
import { Hono } from "hono";

const router = new Hono<HonoEnv>();

router.get("/sign_in");

export const authRouter = router;
