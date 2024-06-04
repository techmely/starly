import type { UseCase } from "@techmely/domain-driven";
import type {
  AuthGoogleIdentityRequest,
  AuthGoogleIdentityResponse,
  LoginRequest,
} from "@techmely/models";

export interface LoginCommand extends LoginRequest {}

export abstract class LoginWithProviderInPort
  implements UseCase<LoginCommand, AuthGoogleIdentityResponse>
{
  abstract execute(loginCommand: LoginCommand): Promise<AuthGoogleIdentityResponse>;
}

export abstract class LoginWithProviderOutPort {
  abstract signInBasic(): Promise<AuthGoogleIdentityRequest>;
}
