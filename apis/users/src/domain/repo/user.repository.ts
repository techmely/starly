import type { RepositoryPort } from "@techmely/ddd-core";
import type { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends RepositoryPort<UserEntity> {}
