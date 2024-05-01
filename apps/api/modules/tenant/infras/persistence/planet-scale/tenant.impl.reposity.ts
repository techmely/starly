import { type EmitDomainEvents, MySQLRepositoryBase } from "@techmely/api-core";
import { consola } from "consola";
import type Emittery from "emittery";
import type { TenantEntity } from "../../../domain/entities/tenant.entity";
import type { TenantModel } from "../../../domain/repo/tenant.model";
import type { ITenantRepository } from "../../../domain/repo/tenant.repository";
import type { TenantMapper } from "../../mappers/tenant.mapper";
import { getDBClient } from "./planet-scale.config";

export class TenantPlanetScaleRepository
  extends MySQLRepositoryBase<TenantEntity, TenantModel, { tenants: TenantModel }>
  implements ITenantRepository
{
  protected tableName = "users";
  protected db = getDBClient();

  constructor(mapper: TenantMapper, emitter: Emittery<EmitDomainEvents>) {
    super(mapper, emitter, consola);
  }
}
