import type { UserTable } from "@techmely/models";
import type { Kysely } from "kysely";
import { PgRepositoryBase } from "../../../../../../libs/db/repository-pg.base.ts";
import type { UserEntity } from "../../../domain/entities/user.entity.ts";
import type { IUserRepository } from "../../../domain/repo/user.repository.ts";
import type { UserMapper } from "../../mappers/user.mapper.ts";

export class UserPgRepository
  extends PgRepositoryBase<UserEntity, UserTable, { users: UserTable }>
  implements IUserRepository
{
  protected tableName = "users";

  constructor(mapper: UserMapper, db: Kysely<any>) {
    super(mapper, db);
  }
}
