import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { CreateUserProps } from "../../../domain/entities/user.types";

export interface CreateUserCommand extends CreateUserProps {}

export abstract class CreateUserInPort implements UseCase<CreateUserCommand, UserEntity> {
  abstract execute(createUserCommand: CreateUserCommand): Promise<UserEntity>;
}
