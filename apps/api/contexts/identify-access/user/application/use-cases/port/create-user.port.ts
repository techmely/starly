import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { CreateUserRequest } from "@techmely/models";

export interface CreateUserCommand extends CreateUserRequest {}

export abstract class CreateUserInPort implements UseCase<CreateUserCommand, UserEntity> {
  abstract execute(createUserCommand: CreateUserCommand): Promise<UserEntity>;
}

export abstract class CreateUserOutPort {
  abstract insert(user: UserEntity): Promise<UserEntity>;
}
