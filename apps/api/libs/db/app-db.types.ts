import type { UserModel } from "@techmely/models";

export type AppDatabase = {
  tenants: any;
  users: UserModel;
};
