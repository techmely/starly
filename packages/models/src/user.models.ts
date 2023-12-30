import { Output, boolean, email, enum_, merge, object, optional, string } from "valibot";
import { baseQuerySchema } from "./base.models";

export enum UserStatus {
  NEWBIE = "NEWBIE",
  VERIFIED = "VERIFIED",
  BLACKLIST = "BLACKLIST",
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export const createUserSchema = object({
  email: string([email()]),
  unverified_email: optional(string([email()])),
  nickname: string(),
  name: string(),
  isEmailVerified: boolean(),
  locale: string(),
  avatarUrl: string(),
  gender: string(),
  status: enum_(UserStatus),
  password: optional(string()),
  birthday: optional(string()),
  firebaseUserId: optional(string()),
  appleId: optional(string()),
  googleId: optional(string()),
  facebookId: optional(string()),
  githubId: optional(string()),
  openPlatform: string(),
  utmCampaign: string(),
  utmMedium: string(),
  utmSource: string(),
});

export const getUsersSchema = merge([
  object({
    email: optional(string()),
  }),
  baseQuerySchema<UserModel>(),
]);

export type GetUserArgs = Output<typeof getUsersSchema>;

export const getUserDetailSchema = merge([
  object({
    email: optional(string()),
  }),
  baseQuerySchema<UserModel>(),
]);

export type UserModel = Output<typeof createUserSchema> & {
  id: string;
};

export type CreateUserModel = Output<typeof createUserSchema>;
