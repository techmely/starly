import type {} from "@techmely/domain-driven";
import type { HonoEnv } from "@techmely/hono";
import { Hono } from "hono";
import { UserController } from "../../../application/controllers/user.controller";
import { CreateUserInteractor } from "../../../application/use-cases/interactors/create-user.interactor";
import { LoginEmailPasswordInteractor } from "../../../application/use-cases/interactors/login.interactor";
import { UserMapper } from "../../mappers/user.mapper";
import { UserPlanetScaleRepository } from "../../persistence/planet-scale/user.impl.repository";

const userMapper = new UserMapper();
const userRepo = new UserPlanetScaleRepository(userMapper);
const createUserUseCases = new CreateUserInteractor(userRepo);
const loginUserPasswordUseCases = new LoginEmailPasswordInteractor(userRepo);
const userController = new UserController(createUserUseCases, loginUserPasswordUseCases);

// POST("/v1/auth/email-password", userController.loginEmailPassword)

// NEXTJS handler (req) {
/**
 *  const body = req.body
 *   userController.loginEmailPassword(body)
 * */
// }
//

const router = new Hono<HonoEnv>();

router.get("/me");
router.put("/my_profile");
router.put("/my_profile/avatar");

export const userRouter = router;
