import type { UserModel } from "@techmely/starly-models";
import type { User } from "firebase/auth";
import type { Locale } from "#root/shared/libs/i18n";

export type AuthState = {
  user?: UserModel;
  accessToken?: string;
  providerErrorMsg?: string;
  isLoading: boolean;
};

export type SignInOptions = {
  locale: Locale;
  provider: "google" | "facebook" | "github";
};

export type SignInOutput =
  | string
  | {
      user: User;
      token?: string;
      idToken?: string;
    };
