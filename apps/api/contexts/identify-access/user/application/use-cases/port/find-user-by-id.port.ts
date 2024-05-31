import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class FindUserByIdOutPort {
  abstract findUserById(userId: string): Promise<UserEntity>;
}
