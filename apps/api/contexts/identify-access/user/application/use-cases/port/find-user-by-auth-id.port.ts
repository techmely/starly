import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class FindUserByAuthIdOutPort {
  abstract findUserByAuthId(authId: string): Promise<UserEntity>;
}

export interface FindUserAuthIdCommand extends CreateUserRequest {}

export abstract class CreateUserInPort implements UseCase<FindUserAuthIdCommand, UserEntity> {
  abstract execute(findUserCommand: FindUserAuthIdCommand): Promise<UserEntity>;
}
