import Emittery from "emittery";
import { UserController } from "../../../../application/controllers/tenant.controller";
import { CreateUserInteractor } from "../../../../domain/use-cases/interactors/create-user.interactor";
import { LoginEmailPasswordInteractor } from "../../../../domain/use-cases/interactors/login.interactor";
import { UserMapper } from "../../../mappers/tenant.mapper";
import { UserPlanetScaleRepository } from "../../../persistence/planet-scale/tenant.impl.reposity";
import type { EmitDomainEvents } from "../../@techmely/ddd-core";

const userMapper = new UserMapper();
const emitter = new Emittery<EmitDomainEvents>();
const userRepo = new UserPlanetScaleRepository(userMapper, emitter);
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
