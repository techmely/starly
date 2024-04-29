export type ElementSize = "small" | "medium" | "large" | "free";
/**
 * High - For the primary, most important, or most common action on a screen: Filled, FAB Button
 * Medium - For important actions that don’t distract from other onscreen elements: Filled Tonal, Elevated, Outlined Button
 * Low - For optional or supplementary actions with the least amount of prominence: Text, Icon, Segmented Button
 */
export type ElementEmphasis = "low" | "medium" | "high";
export type ElementVariant = "outlined" | "filled" | "text" | "ghost" | "elevated";
export type ElementColor = "primary" | "secondary" | "destructive" | "warning" | "info" | "success";
export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";
export type LinkRel =
  | "alternate"
  | "author"
  | "bookmark"
  | "external"
  | "help"
  | "license"
  | "next"
  | "nofollow"
  | "noreferrer"
  | "noopener"
  | "prev"
  | "search"
  | "tag"
  | (string & Record<never, never>);
