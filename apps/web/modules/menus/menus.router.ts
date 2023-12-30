import { type Router, createError, defineEventHandler } from "h3";
import { firebaseAuth } from "#server/utils/firebase-auth";
import { deleteMenu, getMenus, patchMenu, postMenus } from "./menus.service";

export default function useMenusRouter(router: Router) {
  router.get(
    "/api/v1/menus/:slug",
    defineEventHandler({
      onRequest: [firebaseAuth],
      handler: (event) => {
        const method = event.method;

        switch (method) {
          case "PATCH": {
            return patchMenu(event);
          }

          case "DELETE": {
            return deleteMenu(event);
          }

          default:
            throw createError({ statusCode: 400, message: "No matching method" });
        }
      },
    }),
  );
  router.get("/api/v1/menus", defineEventHandler(getMenus));
  router.post(
    "/api/v1/menus",
    defineEventHandler({
      onRequest: [firebaseAuth],
      handler: (event) => {
        return postMenus(event);
      },
    }),
  );
}
