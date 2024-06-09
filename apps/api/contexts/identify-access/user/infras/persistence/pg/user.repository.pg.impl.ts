import type { UserModel } from "@techmely/models";
import type { Kysely } from "kysely";
import { PgRepositoryBase } from "#root/libs/db/repository-pg.base";
import type { IUserRepository } from "../../../domain/repo/user.repository";
import type { AppDatabase } from "#root/libs/db/app-db.types";

export class UserPgRepository
  extends PgRepositoryBase<UserModel, AppDatabase>
  implements IUserRepository
{
  protected tableName = "users";

  // biome-ignore lint/complexity/noUselessConstructor: We need this
  constructor(db: Kysely<any>) {
    super(db);
  }
}
