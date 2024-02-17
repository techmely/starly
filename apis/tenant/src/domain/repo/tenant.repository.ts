import type { RepositoryPort } from "@techmely/ddd-core";
import type { TenantEntity } from "../entities/tenant.entity";

export interface ITenantRepository extends RepositoryPort<TenantEntity> {}
