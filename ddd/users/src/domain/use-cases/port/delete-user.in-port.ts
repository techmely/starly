import type { UserEntity } from "../../entities/user.entity";
import type { UseCase } from "../@techmely/ddd-core";

export interface DeleteUserCommand {
  orderId: string;
}

export abstract class DeleteUserInPort implements UseCase<DeleteUserCommand, UserEntity> {
  abstract execute(deleteUserCommand: DeleteUserCommand): Promise<UserEntity>;
}
