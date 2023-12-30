import { ValueObject } from "../../../../ddd/core/dist";

export interface IUserPassword {
  value: string;
}

export class UserProvider extends ValueObject<IUserPassword> {
  get value() {
    return this.props.value;
  }

  async comparePassword(plainPassword: string) {}

  protected validate(props: IUserPassword): void {}
}
