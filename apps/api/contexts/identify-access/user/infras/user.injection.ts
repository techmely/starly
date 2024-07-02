import { pgDatabase } from "#root/libs/db/pg.db";
import { UserService } from "../application/services/user.service";
import { CreateUserInteractor } from "../application/use-cases/interactors/create-user.interactor";
import { FindUserByAuthIdInteractor } from "../application/use-cases/interactors/find-user-by-auth-id.interactor";
import { FindUserByKeyInteractor } from "../application/use-cases/interactors/find-user-by-key.interactor";
import { UserMapper } from "./mappers/user.mapper";
import { UserPgRepository } from "./persistence/pg/user.repository.pg.impl";

export const userMapper = new UserMapper();
const userRepo = new UserPgRepository(pgDatabase);
const createUserUseCase = new CreateUserInteractor(userRepo, userMapper);
const findUserByAuthIdUseCase = new FindUserByAuthIdInteractor(userRepo);
const findUserByKeyUseCase = new FindUserByKeyInteractor(userRepo);
const userService = new UserService(
  createUserUseCase,
  findUserByAuthIdUseCase,
  findUserByKeyUseCase,
);

export default userService;
