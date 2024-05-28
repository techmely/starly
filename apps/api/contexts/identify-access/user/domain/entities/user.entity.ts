import { Aggregate, Result, UniqueEntityID } from "@techmely/domain-driven";
import { type CreateUserProps, type UserProps, UserRoles, UserStatus } from "./user.types";
import EventEmitter from "node:events";

export class UserEntity extends Aggregate<UserProps> {
  static override create(request: CreateUserProps) {
    const id = new UniqueEntityID();
    const props: UserProps = {
      role: UserRoles.MEMBER,
      status: UserStatus.ACTIVE,
      ...request,
    };
    const user = new UserEntity({ ...props, id }, { emitter: EventEmitter });
    return Result.Ok(user);
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
