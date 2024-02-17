import { url, type Output, number, objectAsync, optional, string } from "valibot";

export const tenantSchema = objectAsync({
  id: optional(number()),
  name: string(),
  description: string(),
  slogan: string(),
  slug: string(),
  logoUrl: string([url()]),
  locale: string(),
  createdBy: string(),
});

export const patchTenantSchema = objectAsync({
  id: optional(number()),
  name: optional(string()),
  description: optional(string()),
  slogan: optional(string()),
  slug: optional(string()),
  logoUrl: optional(string([url()])),
  locale: optional(string()),
  createdBy: optional(string()),
});

export type TenantModel = Output<typeof tenantSchema>;
export type PatchTenantModel = Output<typeof patchTenantSchema>;
