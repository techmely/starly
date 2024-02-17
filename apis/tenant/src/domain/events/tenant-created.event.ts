import { DomainEvent, type IDomainEvent } from "@techmely/api-core";
import type { ITenantCreatedDE } from "../entities/tenant.types";

export class TenantCreatedDomainEvent extends DomainEvent implements ITenantCreatedDE {
  title: string;
  slug: string;

  constructor(props: IDomainEvent<TenantCreatedDomainEvent>) {
    super(props);
    this.title = props.title;
    this.slug = props.slug;
  }
}
