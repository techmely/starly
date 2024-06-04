import type { UseCase } from "@techmely/domain-driven";
import type { GetUserByAuthIdRequest } from "@techmely/models";
import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class FindUserByAuthIdOutPort {
  abstract findUserByAuthId(authId: string): Promise<UserEntity>;
}

export interface FindUserAuthIdCommand extends GetUserByAuthIdRequest {}

export abstract class FindUserByAuthIdInPort implements UseCase<FindUserAuthIdCommand, UserEntity> {
  abstract execute(command: FindUserAuthIdCommand): Promise<UserEntity>;
}
