import { UserEntity } from "../../../domain/entities/user.entity";
import type {
  CreateUserCommand,
  CreateUserInPort,
  CreateUserOutPort,
} from "../port/create-user.port";

export class CreateUserInteractor implements CreateUserInPort {
  constructor(private readonly createUserPort: CreateUserOutPort) {}

  execute(command: CreateUserCommand): Promise<UserEntity> {
    const user = UserEntity.create(command);
    return this.createUserPort.insert(user.value());
  }
}
