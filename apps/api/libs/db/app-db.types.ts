import type { UserTable } from "@techmely/models";

export type AppDatabase = {
  tenants: any;
  users: UserTable;
};
