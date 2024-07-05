import type { UserModel } from "@techmely/starly-models";
import type {
  FindUserByKeyCommand,
  FindUserByKeyInPort,
  FindUserByKeyOutPort,
} from "../port/find-user-by-key";

export class FindUserByKeyInteractor implements FindUserByKeyInPort {
  constructor(private readonly findUserByKeyOutPort: FindUserByKeyOutPort) {}

  async execute(command: FindUserByKeyCommand): Promise<UserModel> {
    const user = await this.findUserByKeyOutPort.findByKey(command.key, command.value);
    return user;
  }
}
