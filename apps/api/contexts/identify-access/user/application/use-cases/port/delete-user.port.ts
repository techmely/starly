import type { UseCase } from "@techmely/domain-driven";
import type { DeleteUserRequest } from "@techmely/starly-models";
import type { UserEntity } from "../../../domain/entities/user.entity";

export interface DeleteUserCommand extends DeleteUserRequest {}

export abstract class DeleteUserInPort implements UseCase<DeleteUserCommand, UserEntity> {
  abstract execute(command: DeleteUserCommand): Promise<UserEntity>;
}
