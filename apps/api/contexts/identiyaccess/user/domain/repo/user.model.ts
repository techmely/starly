import * as z from "zod";
import { UserRoles, UserStatus } from "../entities/user.types";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  unverifiedEmail: z.string().email(),
  isEmailVerified: z.boolean(),
  nickname: z.string(),
  mobile: z.string(),
  birthday: z.string(),
  name: z.string(),
  avatarUrl: z.string(),
  role: z.nativeEnum(UserRoles),
  status: z.nativeEnum(UserStatus),
  locale: z.string().optional(),
  gender: z.string().optional(),
  openPlatform: z.string(),
  utmCampaign: z.string(),
  utmMedium: z.string(),
  utmSource: z.string(),
  googleId: z.string().optional(),
  githubId: z.string().optional(),
  facebookId: z.string().optional(),
  appleId: z.string().optional(),
  createdAt: z.date().default(new Date()).optional(),
  updatedAt: z.date().default(new Date()).optional(),
});

export type UserModel = z.infer<typeof userSchema>;
