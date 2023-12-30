import { Output, boolean, email, minLength, object, optional, string } from "valibot";

export const registerBasicSchema = object({
  email: optional(string([email()]), ""),
  password: optional(string([minLength(8)]), ""),
});

export const registerProvidersSchema = object({
  email: string([email()]),
  isEmailVerified: optional(boolean(), false),
  locale: string(),
  displayName: optional(string()),
  phoneNumber: optional(string()),
  photoURL: optional(string()),
  firebaseUserId: string(),
});

export type RegisterBasicArgs = Output<typeof registerBasicSchema>;
export type RegisterProvidersArgs = Output<typeof registerProvidersSchema>;
