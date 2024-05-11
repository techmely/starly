import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class CreateUserOutPort {
  abstract insert(user: UserEntity): Promise<UserEntity>;
}
