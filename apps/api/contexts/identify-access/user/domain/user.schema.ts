import { AuthStrategy, UserStatus } from "@techmely/starly-models";
import { any, boolean, enum_, object, string } from "valibot";

export const createUserSchema = object({
  email: string(),
  nickname: string(),
  status: enum_(UserStatus),
  isEmailVerified: boolean(),
  name: string(),
  avatarUrl: string(),
  firebaseUserId: string(),
  authStrategy: enum_(AuthStrategy),
  openPlatform: string(),
  utmCampaign: string(),
  utmMedium: string(),
  utmSource: string(),
  metadata: any(),
});

export const signInSchema = object({
  email: string(),
  password: string(),
});

export const signUpSchema = signInSchema;
