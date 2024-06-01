import type {
  AccountServicePort,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LoginWithProviderRequest,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  VerifyAccountRequest,
  VerifyAccountResponse,
  VerifyActivationLinkRequest,
  VerifyActivationLinkResponse,
} from "@techmely/models";

export class AccountService implements AccountServicePort {
  login(request: LoginRequest): Promise<LoginResponse> {
    throw new Error("Method not implemented.");
  }
  loginWithProvider(request: LoginWithProviderRequest): Promise<{ a: number }> {
    throw new Error("Method not implemented.");
  }
  register(request: RegisterRequest): Promise<RegisterResponse> {
    throw new Error("Method not implemented.");
  }
  logout(request: LogoutRequest): Promise<LogoutResponse> {
    throw new Error("Method not implemented.");
  }
  resendVerificationCode(
    request: ResendVerificationCodeRequest,
  ): Promise<ResendVerificationCodeResponse> {
    throw new Error("Method not implemented.");
  }
  updatePassword(request: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    throw new Error("Method not implemented.");
  }
  updateEmail(request: UpdateEmailRequest): Promise<UpdateEmailResponse> {
    throw new Error("Method not implemented.");
  }
  verifyAccount(request: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    throw new Error("Method not implemented.");
  }
  verifyActivationLink(
    request: VerifyActivationLinkRequest,
  ): Promise<VerifyActivationLinkResponse> {
    throw new Error("Method not implemented.");
  }
  forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    throw new Error("Method not implemented.");
  }
}
