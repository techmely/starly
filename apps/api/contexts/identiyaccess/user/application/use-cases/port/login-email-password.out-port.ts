import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class LoginEmailPasswordOutPort {
  abstract insert(user: UserEntity): Promise<UserEntity>;
  abstract findByKey(key: string): Promise<UserEntity>;
}
