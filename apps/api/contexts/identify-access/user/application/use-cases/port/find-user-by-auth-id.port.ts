import type { UseCase } from "@techmely/domain-driven";
import type { GetUserByAuthIdRequest, UserModel } from "@techmely/starly-models";

export abstract class FindUserByAuthIdOutPort {
  abstract findUserByAuthId(authId: string): Promise<UserModel>;
}

export interface FindUserAuthIdCommand extends GetUserByAuthIdRequest {}

export abstract class FindUserByAuthIdInPort implements UseCase<FindUserAuthIdCommand, UserModel> {
  abstract execute(command: FindUserAuthIdCommand): Promise<UserModel>;
}
