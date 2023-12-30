import { patchTenantSchema, tenantSchema } from "@techmely/models";
import { removeUndefObj } from "@techmely/utils";
import { type H3Event, getRouterParam } from "h3";
import { useValidatedBody } from "#server/utils/h3-valibot";
import { TenantRepo } from "./tenant.repo";

export async function getTenants(event: H3Event) {
  const db = event.context["di.db"];
  const tenantRepo = new TenantRepo("tenant", db);
  const tenants = await tenantRepo.readMany();
  return tenants;
}

export async function postTenants(event: H3Event) {
  const db = event.context["di.db"];
  const tenantRepo = new TenantRepo("tenant", db);
  const body = await useValidatedBody(event, tenantSchema);
  const tenant = await tenantRepo.createOne(body);
  return tenant;
}

export async function patchTenant(event: H3Event) {
  const db = event.context["di.db"];
  const tenantRepo = new TenantRepo("tenant", db);
  const slug = getRouterParam(event, "slug");
  const body = await useValidatedBody(event, patchTenantSchema);
  await tenantRepo.updateOne(removeUndefObj(body), { key: "slug", value: slug });
  return { message: `Update tenant ${slug} successfully` };
}

export async function deleteTenant(event: H3Event) {
  const db = event.context["di.db"];
  const tenantRepo = new TenantRepo("tenant", db);
  const slug = getRouterParam(event, "slug");
  await tenantRepo.deleteOne({ key: "slug", value: slug });
  return { message: `Delete tenant ${slug} successfully` };
}
