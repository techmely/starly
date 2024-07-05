import { Aggregate, Result, UniqueEntityID } from "@techmely/domain-driven";
import type { CreateUserRequest } from "@techmely/starly-models";

export class UserEntity extends Aggregate<UserProps> {
  static override create(request: CreateUserRequest) {
    const id = new UniqueEntityID();
    const props: UserProps = {
      ...request,
    };
    const user = new UserEntity({ ...props, id });
    return Result.Ok(user);
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
