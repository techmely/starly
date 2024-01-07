import { type Output, objectAsync } from "valibot";

export const tenantSchema = objectAsync({});

export const patchTenantSchema = objectAsync({});

export type TemplateModel = Output<typeof tenantSchema>;
export type PatchTemplateModel = Output<typeof patchTenantSchema>;
