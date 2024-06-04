import { object, string } from "valibot";

export const updateUserSchema = {};

export const signInSchema = object({
  email: string(),
  password: string(),
});

export const signUpSchema = signInSchema;
