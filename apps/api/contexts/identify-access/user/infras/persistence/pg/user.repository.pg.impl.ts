import type { UserModel } from "@techmely/models";
import type { Kysely } from "kysely";
import { PgRepositoryBase } from "#root/libs/db/repository-pg.base";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repo/user.repository";
import type { UserMapper } from "../../mappers/user.mapper";

export class UserPgRepository
  extends PgRepositoryBase<UserEntity, UserModel, { users: UserModel }>
  implements IUserRepository
{
  protected tableName = "users";

  // biome-ignore lint/complexity/noUselessConstructor: We need this
  constructor(mapper: UserMapper, db: Kysely<any>) {
    super(mapper, db);
  }
}
