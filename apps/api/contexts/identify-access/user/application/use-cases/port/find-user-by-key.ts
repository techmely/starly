import type { UseCase } from "@techmely/domain-driven";
import type { GetUserRequest, UserModel } from "@techmely/starly-models";
import type { StringEnum } from "@techmely/types";

export abstract class FindUserByKeyOutPort {
  abstract findByKey(key: StringEnum<keyof UserModel>, value: unknown): Promise<UserModel>;
}

export interface FindUserByKeyCommand extends GetUserRequest {}

export abstract class FindUserByKeyInPort implements UseCase<FindUserByKeyCommand, UserModel> {
  abstract execute(findUserCommand: FindUserByKeyCommand): Promise<UserModel>;
}
