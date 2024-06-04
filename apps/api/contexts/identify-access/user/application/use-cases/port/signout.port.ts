import type { UseCase } from "@techmely/domain-driven";
import type { AuthGoogleIdentityResponse, SignOutRequest } from "@techmely/models";

export abstract class SignOutInPort implements UseCase<SignOutRequest, AuthGoogleIdentityResponse> {
  abstract execute(request: SignOutRequest): Promise<AuthGoogleIdentityResponse>;
}
