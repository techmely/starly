import type { UserModel } from "@techmely/starly-models";
import type {
  FindUserAuthIdCommand,
  FindUserByAuthIdInPort,
  FindUserByAuthIdOutPort,
} from "../port/find-user-by-auth-id.port";

export class FindUserByAuthIdInteractor implements FindUserByAuthIdInPort {
  constructor(private readonly findUserByAuthIdPort: FindUserByAuthIdOutPort) {}

  async execute(command: FindUserAuthIdCommand): Promise<UserModel> {
    const user = await this.findUserByAuthIdPort.findUserByAuthId(command.id);
    return user;
  }
}
