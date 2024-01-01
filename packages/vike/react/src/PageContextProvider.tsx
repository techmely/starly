import React from "react";
import type { PageContext } from "vike/types";

const { Context: VikePageContext } = getGlobalObject("PageContextProvider.ts", {
  Context: React.createContext<PageContext>(undefined as never),
});

export function PageContextProvider({
  pageContext,
  children,
}: { pageContext: PageContext; children: React.ReactNode }) {
  if (!pageContext) throw new Error("Argument pageContext missing");
  return <VikePageContext.Provider value={pageContext}>{children}</VikePageContext.Provider>;
}

function getGlobalObject<T extends Record<string, unknown> = never>(
  // We use the filename as key; each `getGlobalObject()` call should live in a unique filename.
  key: `${string}.ts`,
  defaultValue: T,
): T {
  // biome-ignore lint/suspicious/noAssignInExpressions: Ignore this
  const allGlobalObjects = (globalThis.__vike = globalThis.__vike || {});
  // biome-ignore lint/suspicious/noAssignInExpressions: Ignore this
  const globalObject = (allGlobalObjects[key] = (allGlobalObjects[key] as T) || defaultValue);
  return globalObject;
}

export { VikePageContext };
