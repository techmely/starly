import * as z from "zod";

export const tenantSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  slogan: z.string(),
  slug: z.string(),
  logoUrl: z.string().url(),
  locale: z.string(),
  createdBy: z.string(),
});

export const patchTenantSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  slogan: z.string().optional(),
  slug: z.string().optional(),
  logoUrl: z.string().url().optional(),
  locale: z.string().optional(),
  createdBy: z.string().optional(),
});

export type TenantModel = z.infer<typeof tenantSchema>;
export type PatchTenantModel = z.infer<typeof patchTenantSchema>;
