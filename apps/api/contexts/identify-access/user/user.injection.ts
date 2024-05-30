import type { Kysely } from "kysely";
import { UserMapper } from "./infras/mappers/user.mapper";
import { UserPgRepository } from "./infras/persistence/pg/user.repository.pg.impl";
import { CreateUserInteractor } from "./application/use-cases/interactors/create-user.interactor";
import { LoginEmailPasswordInteractor } from "./application/use-cases/interactors/login.interactor";
import { UserService } from "./application/services/user.service";

type UserInjectionOptions = {
  db: Kysely<any>;
};

export function injectUserDomain({ db }: UserInjectionOptions): UserService {
  const userMapper = new UserMapper();
  const userRepo = new UserPgRepository(userMapper, db);
  const createUserUseCases = new CreateUserInteractor(userRepo);
  const loginUserPasswordUseCases = new LoginEmailPasswordInteractor(userRepo);
  const service = new UserService(createUserUseCases, loginUserPasswordUseCases);

  return service;
}
