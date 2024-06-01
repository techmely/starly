import type {} from "@techmely/domain-driven";
import { Hono } from "hono";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import userService from "../../user.injection";

const router = new Hono<HonoEnv>();
router.put("/");
router.get("/me", (c, next) => {
  const x = userService.get(request);
});
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
