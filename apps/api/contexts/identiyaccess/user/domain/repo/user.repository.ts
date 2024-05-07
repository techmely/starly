import type { RepositoryPort } from "@techmely/domain-driven";
import type { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends RepositoryPort<UserEntity> {}
