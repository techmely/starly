import { consola } from "consola";
import type Emittery from "emittery";
import type { UserEntity } from "../../../domain/entities/tenant.entity";
import type { UserModel } from "../../../domain/repo/tenant.model";
import type { IUserRepository } from "../../../domain/repo/tenant.repository";
import type { UserMapper } from "../../mappers/tenant.mapper";
import { type EmitDomainEvents, MySQLRepositoryBase } from "../@techmely/ddd-core";
import { getDBClient } from "./planet-scale.config";

export class UserPlanetScaleRepository
  extends MySQLRepositoryBase<UserEntity, UserModel, { users: UserModel }>
  implements IUserRepository
{
  protected tableName = "users";
  protected db = getDBClient();

  constructor(mapper: UserMapper, emitter: Emittery<EmitDomainEvents>) {
    super(mapper, emitter, consola);
  }
}
