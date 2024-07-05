import type { UseCase } from "@techmely/domain-driven";
import type {
  AuthGoogleIdentityRequest,
  AuthGoogleIdentityResponse,
  SignInRequest,
  SignUpRequest,
} from "@techmely/starly-models";

export interface SignInEmailPasswordCommand extends SignInRequest, AuthGoogleIdentityRequest {}

export abstract class SignInEmailPasswordInPort
  implements UseCase<SignInEmailPasswordCommand, AuthGoogleIdentityResponse>
{
  abstract execute(command: SignInEmailPasswordCommand): Promise<AuthGoogleIdentityResponse>;
}

export abstract class AuthGoogleIdentifyOutPort {
  abstract signInEmailPassword(
    request: AuthGoogleIdentityRequest,
  ): Promise<(request: SignInRequest) => Promise<AuthGoogleIdentityResponse>>;
  abstract signInWithProvider(
    request: AuthGoogleIdentityRequest,
  ): Promise<(request: SignInRequest) => Promise<AuthGoogleIdentityResponse>>;
  abstract signUpEmailPassword(
    request: AuthGoogleIdentityRequest,
  ): Promise<(request: SignUpRequest) => Promise<AuthGoogleIdentityResponse>>;
}
