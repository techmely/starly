import type { UseCase } from "@techmely/domain-driven";
import type { AuthGoogleIdentityResponse, SignInWithProviderRequest } from "@techmely/models";

export abstract class SignInWithProviderInPort
  implements UseCase<SignInWithProviderRequest, AuthGoogleIdentityResponse>
{
  abstract execute(request: SignInWithProviderRequest): Promise<AuthGoogleIdentityResponse>;
}
