import type { RepositoryPort } from "@techmely/api-core";
import type { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends RepositoryPort<UserEntity> {}
