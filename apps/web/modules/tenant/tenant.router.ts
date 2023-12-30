import { type Router, createError, defineEventHandler } from "h3";
import { firebaseAuth, requireAuthorization } from "#server/utils/firebase-auth";
import { deleteTenant, getTenants, patchTenant, postTenants } from "./tenant.service";

export default function useTenantRouter(router: Router) {
  router.use(
    "/tenants/:slug",
    defineEventHandler({
      onRequest: [firebaseAuth],
      handler: (event) => {
        requireAuthorization(event);

        const method = event.method;

        switch (method) {
          case "PATCH": {
            return patchTenant(event);
          }

          case "DELETE": {
            return deleteTenant(event);
          }

          default:
            throw createError({ statusCode: 400, message: "No matching method" });
        }
      },
    }),
  );
  router.get("/tenants", defineEventHandler(getTenants));
  router.post(
    "/tenants",
    defineEventHandler({
      onRequest: [firebaseAuth],
      handler: (event) => {
        requireAuthorization(event);
        return postTenants(event);
      },
    }),
  );
}
