import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";
import type { GetUserRequest } from "@techmely/models";
import type { StringEnum } from "@techmely/types";

export abstract class FindUserByKeyOutPort {
  abstract findByKey(key: StringEnum<keyof UserEntity>, value: unknown): Promise<UserEntity>;
}

export interface FindUserByKeyCommand extends GetUserRequest {}

export abstract class FindUserByKeyInPort implements UseCase<FindUserByKeyCommand, UserEntity> {
  abstract execute(findUserCommand: FindUserByKeyCommand): Promise<UserEntity>;
}
