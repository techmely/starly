import {PgRepositoryBase} from "../../../../../../libs/db/repository.pg.base.ts";
import type {UserMapper} from "../../mappers/user.mapper.ts";

export class UserPgRepository
  extends PgRepositoryBase<UserEntity, UserModel, { users: UserModel }>
  implements IUserRepository
{
  protected tableName = "users";
  protected db = getDBClient();

  constructor(mapper: UserMapper) {
    super(mapper);
  }
}
