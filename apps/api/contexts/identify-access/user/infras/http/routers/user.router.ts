import type {} from "@techmely/domain-driven";
import { Hono } from "hono";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import userService from "../../user.injection";
import { useUserGuard } from "../middleware/user.guard";
import type { BaseResponse } from "@techmely/models";
import type { SuccessStatusCode } from "hono/utils/http-status";

const router = new Hono<HonoEnv>();
router.put("/");
router.get("/me", useUserGuard(), async (c, next) => {
  const user = c.get("user");
  if (user?.updatedAt) {
    c.header("Last-Modified", user.updatedAt);
    return c.json<BaseResponse, SuccessStatusCode>({ data: user });
  }
});
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
