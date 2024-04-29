import type { UseCase } from "@techmely/api-core";
import type { UserEntity } from "../../entities/user.entity";

export interface DeleteUserCommand {
  orderId: string;
}

export abstract class DeleteUserInPort implements UseCase<DeleteUserCommand, UserEntity> {
  abstract execute(deleteUserCommand: DeleteUserCommand): Promise<UserEntity>;
}
