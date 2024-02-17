import type { UseCase } from "@techmely/ddd-core";

export interface LoginEmailPasswordCommand {
  username: string;
  password: string;
}

export abstract class LoginEmailPasswordInPort implements UseCase<LoginEmailPasswordCommand, void> {
  abstract execute(loginCommand: LoginEmailPasswordCommand): Promise<void>;
}
