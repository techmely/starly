import type { Mapper } from "@techmely/domain-driven";
import type { TenantEntity } from "../../domain/entities/tenant.entity";
import type { TenantModel } from "../../domain/tenant.schema";

export class TenantMapper implements Mapper<TenantEntity, TenantModel> {
  toPersistence(entity: TenantEntity): {
    slug: string;
    name: string;
    description: string;
    slogan: string;
    logoUrl: string;
    locale: string;
    createdBy: string;
    id?: number | undefined;
  } {
    throw new Error("Method not implemented.");
  }
  toDomain(record: {
    slug: string;
    name: string;
    description: string;
    slogan: string;
    logoUrl: string;
    locale: string;
    createdBy: string;
    id?: number | undefined;
  }): TenantEntity {
    throw new Error("Method not implemented.");
  }
  toResponse() {}
}
