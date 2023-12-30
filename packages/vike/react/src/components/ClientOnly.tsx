import React, { lazy, startTransition, useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";

export function ClientOnly<T>({
  load,
  children,
  fallback,
  deps = [],
}: {
  load: () => Promise<{ default: React.ComponentType<T> } | React.ComponentType<T>>;
  children: (Component: React.ComponentType<T>) => ReactNode;
  fallback: ReactNode;
  deps?: Parameters<typeof useEffect>[1];
}) {
  const [Component, setComponent] = useState<ComponentType<unknown> | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: I don't know
  useEffect(() => {
    const loadComponent = () => {
      const Component = lazy(() =>
        load()
          .then((LoadedComponent) => {
            return {
              default: () =>
                children("default" in LoadedComponent ? LoadedComponent.default : LoadedComponent),
            };
          })
          .catch((error) => {
            console.error("Component loading failed:", error);
            return { default: () => <p>Error loading component.</p> };
          }),
      );
      setComponent(Component);
    };

    startTransition(() => {
      loadComponent();
    });
  }, [deps]);

  return Component ? <Component /> : fallback;
}
