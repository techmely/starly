import type { RepositoryPort } from "@techmely/domain-driven";
import type { UserModel } from "@techmely/starly-models";

export interface IUserRepository extends RepositoryPort<UserModel> {}
