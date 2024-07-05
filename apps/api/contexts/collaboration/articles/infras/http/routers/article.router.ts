import type { HonoEnv } from "#root/libs/hono/hono.types";
import { Hono } from "hono";
import { MOCK_ARTICLES } from "../../../__test__/mock/article.mock";

const router = new Hono<HonoEnv>();

router.get("/", (c) => {
  return c.json({ data: MOCK_ARTICLES });
});

export const articleRouter = router;
