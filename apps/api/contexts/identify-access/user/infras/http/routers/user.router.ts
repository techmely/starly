import { vValidator } from "@techmely/hono";
import type { BaseResponse } from "@techmely/starly-models";
import { Hono } from "hono";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import { createUserSchema } from "../../../domain/user.schema";
import userService, { userMapper } from "../../user.injection";
import { useUserGuard } from "../middleware/user.guard";

const router = new Hono<HonoEnv>();
router.post("/", vValidator("json", createUserSchema), async (c, next) => {
  const request = c.req.valid("json");
  const xxx = await userService.Create(request);
  const response: BaseResponse = { data: userMapper.toResponse() };
  return c.json(response);
});
router.get("/me", useUserGuard(), async (c) => {
  const user = c.get("user");
  if (user?.updatedAt) {
    c.header("Last-Modified", user.updatedAt);
  }
  const response: BaseResponse = { data: user };
  return c.json(response);
});
router.put("/me");
router.put("/me/avatar");

export const userRouter = router;
