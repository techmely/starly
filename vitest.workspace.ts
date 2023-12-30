import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "Models",
      environment: "node",
      include: ["packages/models/**/*.test.ts"],
    },
  },
  {
    test: {
      name: "App Webs",
      environment: "happy-dom",
      include: ["apps/web/**/*.test.ts"],
    },
  },
]);
