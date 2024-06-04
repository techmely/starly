import type {} from "@techmely/domain-driven";
import type { BaseResponse } from "@techmely/models";
import { Hono } from "hono";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import { useUserGuard } from "../middleware/user.guard";

const router = new Hono<HonoEnv>();
router.put("/");
router.get("/me", useUserGuard(), async (c) => {
  const user = c.get("user");
  if (user?.updatedAt) {
    c.header("Last-Modified", user.updatedAt);
  }
  const response: BaseResponse = { data: user };
  return c.json(response);
});
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
