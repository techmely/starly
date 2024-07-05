import type { UseCase } from "@techmely/domain-driven";
import type { CreateUserRequest, UserModel } from "@techmely/starly-models";

export interface CreateUserCommand extends CreateUserRequest {}

export abstract class CreateUserInPort implements UseCase<CreateUserCommand, UserModel> {
  abstract execute(createUserCommand: CreateUserCommand): Promise<UserModel>;
}

export abstract class CreateUserOutPort {
  abstract insert(user: UserModel): Promise<UserModel>;
}
