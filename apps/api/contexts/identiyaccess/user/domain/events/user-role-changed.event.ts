import { DomainEvent, type IDomainEvent } from "@techmely/domain-driven";
import type { UserRoles } from "../entities/user.types";

export class UserRoleChangedDomainEvent extends DomainEvent {
  readonly oldRole: UserRoles;

  readonly newRole: UserRoles;

  constructor(props: IDomainEvent<UserRoleChangedDomainEvent>) {
    super(props);
    this.oldRole = props.oldRole;
    this.newRole = props.newRole;
  }
}
