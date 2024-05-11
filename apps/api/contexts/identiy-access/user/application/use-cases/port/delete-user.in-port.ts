import type { UseCase } from "@techmely/domain-driven";
import type { UserEntity } from "../../../domain/entities/user.entity";

export interface DeleteUserCommand {
  orderId: string;
}

export abstract class DeleteUserInPort implements UseCase<DeleteUserCommand, UserEntity> {
  abstract execute(deleteUserCommand: DeleteUserCommand): Promise<UserEntity>;
}
