import type {} from "@techmely/domain-driven";
import type { HonoEnv } from "@techmely/hono";
import { Hono } from "hono";
import { injectUserDomain } from "../../../user.injection";

// POST("/v1/auth/email-password", userController.loginEmailPassword)

// NEXTJS handler (req) {
/**
 *  const body = req.body
 *   userController.loginEmailPassword(body)
 * */
// }
//

const router = new Hono<HonoEnv>();
router.use(async (c, next) => {
  const { db } = c.get("container");
  const userService = injectUserDomain({ db });
  c.set("userService", userService);
  await next();
});
router.put("/");
router.get("/me");
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
