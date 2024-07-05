import { type DomainMapper, UniqueEntityID } from "@techmely/domain-driven";
import { UserEntity } from "../../domain/entities/user.entity";
import type { UserModel } from "@techmely/starly-models";

export class UserMapper implements DomainMapper<any, UserModel, UserEntity> {
  toPersistence(entity: UserEntity): UserModel {
    const clone = entity.getProps();
    const record: UserModel = {
      id: clone.id.toString(),
      email: clone.email,
      isEmailVerified: clone.isEmailVerified,
      nickname: clone.nickname,
      name: clone.name,
      avatarUrl: clone.avatarUrl,
      status: clone.status,
      authStrategy: clone.authStrategy,
      firebaseUserId: clone.firebaseUserId,
      metadata: clone?.metadata,
      openPlatform: clone.metadata?.raw()?.openPlatform,
      utmCampaign: clone.metadata?.raw()?.utmCampaign,
      utmMedium: clone.metadata?.raw()?.utmMedium,
      utmSource: clone.metadata?.raw()?.utmSource,
      createdAt: clone.createdAt,
      updatedAt: clone.updatedAt,
    };
    return record;
  }
  toDomain(record: UserModel): UserEntity {
    const entity = new UserEntity({
      id: new UniqueEntityID(record.id),
      createdAt: record.createdAt,
      updatedAt: record.createdAt,
    });
    return entity;
  }
  toResponse(entity: UserEntity) {}
}
