import type { Locale } from "#modules/locales/locales.utils";

export const AUTH_ACCESS_TOKEN = "accessToken";
export const AUTH_REFRESH_TOKEN = "refreshToken";

export const AUTH_PATHS = ["/publish", "/me/posts"];

export const authUtmParams = Object.freeze({
  facebook: {
    utmCampaign: "FacebookLogin",
    utmSource: "Website",
    utmMedium: "LoginPage",
  },
  google: {
    utmCampaign: "GoogleLogin",
    utmSource: "Website",
    utmMedium: "LoginPage",
  },
  github: {
    utmCampaign: "GithubLogin",
    utmSource: "Website",
    utmMedium: "LoginPage",
  },
  email: {
    utmCampaign: "EmailLogin",
    utmSource: "Website",
    utmMedium: "LoginPage",
  },
});

type AuthErrorMsg = Record<
  Locale,
  Record<
    | "account-exists-with-different-credential"
    | "email-already-exists"
    | "phone-number-already-exists"
    | "invalid-password"
    | "too-many-requests",
    string
  >
>;

export const firebaseAuthErrMs: AuthErrorMsg = {
  vi: {
    "account-exists-with-different-credential":
      "Tài khoản này đã được đăng ký với provider khác. Nếu bạn không nhớ là provider nào, vui lòng liên hệ support@techmely.com để được hỗ trợ.",
    "email-already-exists": "Email đã tồn tại",
    "phone-number-already-exists": "Số điện thoại đã tồn tại",
    "invalid-password": "Mật khẩu sai, vui lòng thử lại.",
    "too-many-requests":
      "Tài khoản của bạn đã bị tấn công, vui lòng liên hệ support@techmely.com để được hỗ trợ.",
  },
  en: {
    "account-exists-with-different-credential":
      "Your account already exists with another provider. If you do not remember which provider, please contact support@techmely.com to support.",
    "email-already-exists": "Email already exists.",
    "phone-number-already-exists": "Phone number already exists.",
    "invalid-password": "Invalid password, please try again.",
    "too-many-requests":
      "Your account suspected being hacked, please contact support@techmely.com to support.",
  },
};
