import type { OmitProperties } from "ts-essentials";

export interface TenantProps {
  title: string;
  slug: string;
}

export interface CreateTenantProps extends TenantProps {}

export interface ITenantCreatedDE extends TenantProps {}
export interface ITenantUpdatedDE
  extends OmitProperties<Partial<TenantProps>, "status" | "metadata"> {}
