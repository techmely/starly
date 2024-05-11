// import {
//   type EmitDomainEvents,
//   MySQLRepositoryBase,
// } from "@techmely/domain-driven";
// import consola from "consola";
// import type Emittery from "emittery";
// import type { UserEntity } from "../../../domain/entities/user.entity";
// import type { UserModel } from "../../../domain/repo/user.model";
// import type { IUserRepository } from "../../../domain/repo/user.repository";
// import type { UserMapper } from "../../mappers/user.mapper";
// import { getDBClient } from "./planet-scale.config";

// export class UserPlanetScaleRepository
//   extends MySQLRepositoryBase<UserEntity, UserModel, { users: UserModel }>
//   implements IUserRepository
// {
//   protected tableName = "users";
//   protected db = getDBClient();

//   constructor(mapper: UserMapper, emitter: Emittery<EmitDomainEvents>) {
//     super(mapper, emitter, consola);
//   }
// }
