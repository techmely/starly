import { vValidator } from "@techmely/hono";
import { Hono } from "hono";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import { signInSchema, signUpSchema } from "../../../domain/user.schema";
import accountService from "../../account.injection";

const router = new Hono<HonoEnv>();

router.post("/sign_in", vValidator("json", signInSchema), async (c) => {
  const request = c.req.valid("json");
  const result = await accountService.SignIn(request);
  return c.json({ data: result });
});

router.post("/sign_in/provider");
router.post("/sign_up", vValidator("json", signUpSchema), async (c) => {
  const request = c.req.valid("json");
  const result = await accountService.SignUp(request);
  return c.json({ data: result });
});

router.post("/sign_up/provider");
router.post("/sign_out", async (c) => {
  await accountService.SignOut({});
  return c.json({ data: "OK" });
});

export const accountRouter = router;
