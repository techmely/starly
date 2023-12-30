import { createMenuSchema, patchMenuSchema } from "@techmely/models";
import { removeUndefObj } from "@techmely/utils";
import { type H3Event, getRouterParam } from "h3";
import { useValidatedBody } from "#server/utils/h3-valibot";
import { MenuRepo } from "./menus.repo";

export async function getMenus(event: H3Event) {
  const db = event.context["di.db"];
  const menuRepo = new MenuRepo("menus", db);
  const menus = await menuRepo.readMany();
  return menus;
}

export async function postMenus(event: H3Event) {
  const db = event.context["di.db"];
  const menuRepo = new MenuRepo("menus", db);
  const body = await useValidatedBody(event, createMenuSchema);
  const menu = await menuRepo.createOne(body);
  return menu;
}

export async function patchMenu(event: H3Event) {
  const db = event.context["di.db"];
  const menuRepo = new MenuRepo("menus", db);
  const slug = getRouterParam(event, "slug");
  const body = await useValidatedBody(event, patchMenuSchema);
  await menuRepo.updateOne(removeUndefObj(body), { key: "slug", value: slug });
  return { message: `Update menu ${slug} successfully` };
}

export async function deleteMenu(event: H3Event) {
  const db = event.context["di.db"];
  const menuRepo = new MenuRepo("menus", db);
  const slug = getRouterParam(event, "slug");
  await menuRepo.deleteOne({ key: "slug", value: slug });
  return { message: `Delete menu ${slug} successfully` };
}
