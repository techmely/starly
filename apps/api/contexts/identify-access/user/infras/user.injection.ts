import { UserService } from "../application/services/user.service";
import { CreateUserInteractor } from "../application/use-cases/interactors/create-user.interactor";
import { LoginEmailPasswordInteractor } from "../application/use-cases/interactors/login.interactor";
import { UserMapper } from "./mappers/user.mapper";
import { UserPgRepository } from "./persistence/pg/user.repository.pg.impl";
import { pgDatabase } from "#root/libs/db/pg.db";

export const userMapper = new UserMapper();
const userRepo = new UserPgRepository(userMapper, pgDatabase);
const createUserUseCases = new CreateUserInteractor(userRepo);
const loginUserPasswordUseCases = new LoginEmailPasswordInteractor(userRepo);
const userService = new UserService(userMapper, createUserUseCases);

export default userService;
