import type { UserModel } from "@techmely/starly-models";
import { UserEntity } from "../../../domain/entities/user.entity";
import type {
  CreateUserCommand,
  CreateUserInPort,
  CreateUserOutPort,
} from "../port/create-user.port";
import type { UserMapper } from "../../../infras/mappers/user.mapper";

export class CreateUserInteractor implements CreateUserInPort {
  constructor(
    private readonly createUserPort: CreateUserOutPort,
    private readonly mapper: UserMapper,
  ) {}

  execute(command: CreateUserCommand): Promise<UserModel> {
    const user = UserEntity.create(command);
    const model = this.mapper.toPersistence(user.value());
    return this.createUserPort.insert(model);
  }
}
