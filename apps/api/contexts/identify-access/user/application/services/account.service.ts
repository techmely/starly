import type {
  AccountServicePort,
  AuthGoogleIdentityResponse,
  Empty,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  SignInRequest,
  SignInWithProviderRequest,
  SignUpRequest,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  VerifyAccountRequest,
  VerifyAccountResponse,
  VerifyActivationLinkRequest,
  VerifyActivationLinkResponse,
} from "@techmely/starly-models";

export class AccountService implements AccountServicePort {
  SignOut(request: Empty): Promise<Empty> {
    throw new Error("Method not implemented.");
  }
  SignIn(request: SignInRequest): Promise<AuthGoogleIdentityResponse> {
    throw new Error("Method not implemented.");
  }
  SignInWithProvider(request: SignInWithProviderRequest): Promise<AuthGoogleIdentityResponse> {
    throw new Error("Method not implemented.");
  }
  SignUp(request: SignUpRequest): Promise<AuthGoogleIdentityResponse> {
    throw new Error("Method not implemented.");
  }
  ResendVerificationCode(
    request: ResendVerificationCodeRequest,
  ): Promise<ResendVerificationCodeResponse> {
    throw new Error("Method not implemented.");
  }
  UpdatePassword(request: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    throw new Error("Method not implemented.");
  }
  UpdateEmail(request: UpdateEmailRequest): Promise<UpdateEmailResponse> {
    throw new Error("Method not implemented.");
  }
  VerifyAccount(request: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    throw new Error("Method not implemented.");
  }
  VerifyActivationLink(
    request: VerifyActivationLinkRequest,
  ): Promise<VerifyActivationLinkResponse> {
    throw new Error("Method not implemented.");
  }
  ForgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    throw new Error("Method not implemented.");
  }
}
