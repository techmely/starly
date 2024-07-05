import type { FirebaseAuthConfig } from "@techmely/starly-models";
import { AccountService } from "../application/services/account.service";
import { SignInEmailPasswordInteractor } from "../application/use-cases/interactors/signin-email-password.interactor";
import type { AuthGoogleIdentifyOutPort } from "../application/use-cases/port/signin-email-password.port";
import { signInBasic } from "@techmely/auth";

const accountService = new AccountService();
const authGoogleIdentify = {
  signInEmailPassword(request) {
    return signInBasic(request);
  },
  signInWithProvider(request) {},
  signUpEmailPassword(request) {},
};
const signInEmailPasswordUsecase = new SignInEmailPasswordInteractor();

export default accountService;
