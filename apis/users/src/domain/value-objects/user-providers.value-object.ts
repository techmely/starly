import { ValueObject } from "@techmely/ddd-core";

export interface IUserProvider {
  githubId?: string;
  googleId?: string;
  facebookId?: string;
  appleId?: string;
}

export class UserProvider extends ValueObject<IUserProvider> {
  protected validate(props: IUserProvider): void {}
}
