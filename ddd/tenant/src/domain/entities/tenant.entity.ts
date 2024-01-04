import { AggregateRoot, UniqueEntityID } from "@techmely/ddd-core";
import { UserCreatedDomainEvent } from "../events/tenant-created.event";
import { type CreateUserProps, type UserProps, UserRoles, UserStatus } from "./tenant.types";

export class TenantEntity extends AggregateRoot<UserProps> {
  static create(createProps: CreateUserProps) {
    const id = new UniqueEntityID();
    const props: UserProps = { role: UserRoles.MEMBER, status: UserStatus.ACTIVE, ...createProps };
    const user = new TenantEntity({ id, props });
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        ...props,
        ...props?.metadata?.raw(),
        ...props?.provider?.raw(),
      }),
    );
    return user;
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
