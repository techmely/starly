import type { UserModel } from "@techmely/starly-models";
import type { UserRecord } from "firebase-admin/auth";

declare global {
  namespace Vike {
    interface PageContext {
      user?: UserModel;
      firebaseUser?: UserRecord;
    }
  }
}
