import type {} from "@techmely/domain-driven";
import type { HonoEnv } from "@techmely/hono";
import { Hono, type MiddlewareHandler } from "hono";
import { UserController } from "../../../application/controllers/user.controller";
import { CreateUserInteractor } from "../../../application/use-cases/interactors/create-user.interactor";
import { LoginEmailPasswordInteractor } from "../../../application/use-cases/interactors/login.interactor";
import { UserMapper } from "../../mappers/user.mapper";
import { UserPgRepository } from "../../persistence/pg/user.repository.pg.impl";

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
  const db = c.get("container").db;
  const userMapper = new UserMapper();
  const userRepo = new UserPgRepository(userMapper, db);
  const createUserUseCases = new CreateUserInteractor(userRepo);
  const loginUserPasswordUseCases = new LoginEmailPasswordInteractor(userRepo);
  const userController = new UserController(createUserUseCases, loginUserPasswordUseCases);

  await next();
});
router.put("/");
router.get("/me");
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
