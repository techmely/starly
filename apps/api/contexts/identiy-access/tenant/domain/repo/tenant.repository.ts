import type { RepositoryPort } from "@techmely/domain-driven";
import type { TenantEntity } from "../entities/tenant.entity";

export interface ITenantRepository extends RepositoryPort<TenantEntity> {}
