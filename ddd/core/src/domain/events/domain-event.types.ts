import type { DomainEvent } from "./domain-event.base";

export type EmitDomainEvents = {
  userCreated: DomainEvent;
  userUpdated: DomainEvent;
  userRoleChanged: DomainEvent;
  userDeleted: DomainEvent;
};
