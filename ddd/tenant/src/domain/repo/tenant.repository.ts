import type { RepositoryPort } from "@techmely/ddd-core";
import type { UserEntity } from "../entities/tenant.entity";

export interface IUserRepository extends RepositoryPort<UserEntity> {}
