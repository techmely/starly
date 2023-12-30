import { createUserSchema } from "@techmely/models";
import { type H3Event, getRouterParam } from "h3";
import { useValidatedBody } from "#server/utils/h3-valibot";
import { UserRepo } from "./user.repo";

export async function getUsers(event: H3Event) {
  const db = event.context["di.db"];
  const userRepo = new UserRepo("users", db);
  const users = await userRepo.readMany();
  return users;
}

export async function postUser(event: H3Event) {
  const db = event.context["di.db"];
  const userRepo = new UserRepo("users", db);
  const body = await useValidatedBody(event, createUserSchema);
  const user = await userRepo.createOne(body);
  return user;
}

export async function deactivateUser(event: H3Event) {
  const db = event.context["di.db"];
  const userRepo = new UserRepo("users", db);
  const slug = getRouterParam(event, "slug");
  await userRepo.deleteOne({ key: "slug", value: slug });
  return { message: `Delete user ${slug} successfully` };
}
