import type { Node } from "./model";

export type DOMNode = InstanceType<typeof window.Node>;
export type NodeCallbackFn = (
  node: Node,
  start: number,
  parent: Node | null,
  index: number,
  // biome-ignore lint/suspicious/noConfusingVoidType: Ignore
) => boolean | void;
