import type { UserEntity } from "../../../domain/entities/user.entity";

export abstract class GetCurrentUserOutPort {
  abstract getCurrentUser(): Promise<UserEntity>;
}
