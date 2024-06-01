import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { GetUserByAuthIdRequest } from "@techmely/models";

export abstract class FindUserByAuthIdOutPort {
  abstract findUserByAuthId(authId: string): Promise<UserEntity>;
}

export interface FindUserAuthIdCommand extends GetUserByAuthIdRequest {}

export abstract class FindUserByAuthIdInPort implements UseCase<FindUserAuthIdCommand, UserEntity> {
  abstract execute(findUserCommand: FindUserAuthIdCommand): Promise<UserEntity>;
}
