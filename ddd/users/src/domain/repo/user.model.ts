import {
  type Output,
  boolean,
  date,
  email,
  enum_,
  minLength,
  object,
  optional,
  string,
} from "valibot";
import { DEFAULT_ENTITY_ID_LENGTH } from "../../../../ddd/core/dist";
import { UserRoles, UserStatus } from "../entities/user.types";

export const userSchema = object({
  id: string([minLength(DEFAULT_ENTITY_ID_LENGTH)]),
  email: string([email()]),
  unverifiedEmail: string([email()]),
  isEmailVerified: boolean(),
  nickname: string(),
  mobile: string(),
  birthday: string(),
  name: string(),
  avatarUrl: string(),
  role: enum_(UserRoles),
  status: enum_(UserStatus),
  locale: optional(string()),
  gender: optional(string()),
  openPlatform: string(),
  utmCampaign: string(),
  utmMedium: string(),
  utmSource: string(),
  googleId: optional(string()),
  githubId: optional(string()),
  facebookId: optional(string()),
  appleId: optional(string()),
  createdAt: optional(date(), new Date()),
  updatedAt: optional(date(), new Date()),
});

export type UserModel = Output<typeof userSchema>;
