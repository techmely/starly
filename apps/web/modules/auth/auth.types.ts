import type { UserModel } from "@techmely/api-users";
import type { User } from "firebase/auth";
import type { Locale } from "../../locales/locales.utils";

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
