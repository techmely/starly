import { Output, number, object, string } from "valibot";

export const roleSchema = object({
  id: number(),
  name: string(),
  description: string(),
});

export type RoleModel = Output<typeof roleSchema>;
