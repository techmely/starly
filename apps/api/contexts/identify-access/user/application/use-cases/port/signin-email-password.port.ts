import type { UseCase } from "@techmely/domain-driven";
import type {
  AuthGoogleIdentityRequest,
  AuthGoogleIdentityResponse,
  LoginRequest,
} from "@techmely/models";

export interface LoginCommand extends LoginRequest {}

export abstract class LoginEmailPasswordInPort
  implements UseCase<LoginCommand, AuthGoogleIdentityResponse>
{
  abstract execute(loginCommand: LoginCommand): Promise<AuthGoogleIdentityResponse>;
}

export abstract class LoginEmailPasswordOutPort {
  abstract signInBasic(): Promise<AuthGoogleIdentityRequest>;
}
