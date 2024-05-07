import { AggregateRoot, UniqueEntityID } from "@techmely/domain-driven";
import { TenantCreatedDomainEvent } from "../events/tenant-created.event";
import type { CreateTenantProps, TenantProps } from "./tenant.types";

export class TenantEntity extends AggregateRoot<TenantProps> {
  static create(createProps: CreateTenantProps) {
    const id = new UniqueEntityID();
    const props: TenantProps = {
      ...createProps,
    };
    const user = new TenantEntity({ id, props });
    const now = Date.now();

    user.addEvent(
      new TenantCreatedDomainEvent({
        aggregateId: id,
        ...props,
        _metadata: {
          timestamp: now,
        },
      }),
    );
    return user;
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
