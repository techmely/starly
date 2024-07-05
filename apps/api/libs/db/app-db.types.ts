import type { UserModel } from "@techmely/starly-models";

export type AppDatabase = {
  tenants: any;
  users: UserModel;
};
