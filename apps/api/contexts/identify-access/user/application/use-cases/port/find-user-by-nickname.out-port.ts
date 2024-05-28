import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class FindUserByNicknameOutPort {
  abstract findUserByNickname(nickname: string): Promise<UserEntity>;
}
