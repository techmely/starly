import type { TenantModel } from "@techmely/models";
import type { EntityState } from "@techmely/types";

export type TenantStore = {
  infos: EntityState<TenantModel>;
};
