import { slugify } from "@techmely/utils";
import {
  Output,
  boolean,
  enum_,
  merge,
  number,
  object,
  optional,
  string,
  transformAsync,
} from "valibot";
import { baseSchema } from "./base.models";

export enum MenuLinkType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
}
export enum MenuType {
  NORMAL = "NORMAL",
  PROMO = "PROMO",
  NEWS = "NEWS",
}
export enum MenuLocation {
  HEADER = "HEADER",
  FOOTER = "FOOTER",
  SIDEBAR = "SIDEBAR",
}

export const createMenuSchema = transformAsync(
  merge([
    baseSchema,
    object({
      link: string(),
      title: string(),
      order: number(),
      linkType: enum_(MenuLinkType),
      location: enum_(MenuLocation),
      type: enum_(MenuType),
      description: optional(string()),
      endIcon: optional(string()),
      isActive: optional(boolean()),
      parentId: optional(string()),
      startIcon: optional(string()),
      createdDate: optional(string()),
    }),
  ]),
  (menu) => ({ ...menu, slug: slugify(menu.title) }),
);

export const patchMenuSchema = transformAsync(createMenuSchema, async (menu) => menu);

export type MenuModel = Output<typeof createMenuSchema>;
