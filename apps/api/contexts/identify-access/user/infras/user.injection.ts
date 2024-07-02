import { UserService } from "../application/services/user.service";
import { CreateUserInteractor } from "../application/use-cases/interactors/create-user.interactor";
import { UserMapper } from "./mappers/user.mapper";
import { UserPgRepository } from "./persistence/pg/user.repository.pg.impl";
import { pgDatabase } from "#root/libs/db/pg.db";

export const userMapper = new UserMapper();
const userRepo = new UserPgRepository(pgDatabase);
const createUserUseCase = new CreateUserInteractor(userRepo, userMapper);
const findUserByAuthIdUseCase = new FindUserByAuthIdInteractor(userRepo, userMapper);
const findUserByKeyUseCase = new FindUserByKeyInteractor(userRepo, userMapper);
const userService = new UserService(
  createUserUseCase,
  findUserByAuthIdUseCase,
  findUserByKeyUseCase,
);

export default userService;
