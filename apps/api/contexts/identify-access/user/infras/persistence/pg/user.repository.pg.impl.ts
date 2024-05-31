import type { UserTable } from "@techmely/models";
import { PgRepositoryBase } from "#root/libs/db/repository-pg.base";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repo/user.repository";

export class UserPgRepository
  extends PgRepositoryBase<UserEntity, UserTable, { users: UserTable }>
  implements IUserRepository
{
  protected tableName = "users";
}
