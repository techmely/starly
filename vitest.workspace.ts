import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "QA Architecture",
      environment: "node",
      include: ["quality-assurance/architecture/**/*.test.mts"],
      setupFiles: ["quality-assurance/vitest/arch.ts"],
    },
  },
  {
    test: {
      name: "Models",
      environment: "node",
      include: ["packages/models/**/*.test.mts"],
    },
  },
  {
    test: {
      name: "App Webs",
      environment: "happy-dom",
      include: ["apps/web/**/*.test.mts"],
    },
  },
]);
