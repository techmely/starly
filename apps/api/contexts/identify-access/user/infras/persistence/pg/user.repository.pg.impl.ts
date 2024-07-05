import type { UserModel } from "@techmely/starly-models";
import type { Kysely } from "kysely";
import { PgRepositoryBase } from "#root/libs/db/repository-pg.base";
import type { IUserRepository } from "../../../domain/repo/user.repository";

export class UserPgRepository extends PgRepositoryBase<UserModel> implements IUserRepository {
  protected tableName = "users";

  // biome-ignore lint/complexity/noUselessConstructor: We need this
  constructor(db: Kysely<any>) {
    super(db);
  }

  async findUserByAuthId(authId: string): Promise<UserModel> {
    const record = (await this.db
      // @ts-ignore
      .selectFrom(this.tableName)
      .where("auth_id", "=", authId)
      .executeTakeFirstOrThrow()) as UserModel;

    return record;
  }
}
