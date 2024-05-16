import { DomainEvent, type IDomainEvent } from "@techmely/domain-driven";
import type { ITenantUpdatedDE } from "../entities/tenant.types";

export class TenantUpdatedDomainEvent extends DomainEvent implements ITenantUpdatedDE {
  email?: string;
  unverifiedEmail?: string;
  isEmailVerified?: boolean;
  nickname?: string;
  mobile?: string;
  birthday?: string;
  name?: string;
  locale?: string | undefined;
  avatarUrl?: string;
  gender?: string | undefined;

  constructor(props: IDomainEvent<TenantUpdatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.unverifiedEmail = props.unverifiedEmail;
    this.isEmailVerified = props.isEmailVerified;
    this.nickname = props.nickname;
    this.mobile = props.mobile;
    this.birthday = props.birthday;
    this.name = props.name;
    this.locale = props.locale;
    this.avatarUrl = props.avatarUrl;
    this.gender = props.gender;
  }
}
