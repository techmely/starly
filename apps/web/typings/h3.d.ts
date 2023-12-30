import type { DecodedIdToken } from "@fiboup/h3-firebase-auth";
import type { Session } from "h3";
import type { Kysely } from "kysely";

declare module "h3" {
  interface H3EventContext extends Record<string, any> {
    /**
     * Matched router Node
     *
     * @experimental The object structure may change in non-major version.
     */
    matchedRoute?: RouteNode;
    sessions?: Record<string, Session>;
    clientAddress?: string;
    "di.db": Kysely<AppDatabase>;
    user?: DecodedIdToken;
  }
}
