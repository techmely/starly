export type ContextStore = {
  theme: "light" | "dark" | "system";
  fontSize: "sm" | "md" | "lg";
};

const initialContextStore: ContextStore = {
  theme: "dark",
  fontSize: "md",
};
