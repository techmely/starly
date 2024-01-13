import { type Attrs, type MarkType, type NodeType, Schema } from "../model";
import { addListNodes } from "../schema-list";

type Tags = { [tag: string]: number };

export type ChildSpec = string | Node | { flat: readonly Node[]; tag: Tags };

const noTag = ((Node.prototype as any).tag = Object.create(null));

function flatten(
  schema: Schema,
  children: ChildSpec[],
  f: (node: Node) => Node,
): { nodes: Node[]; tag: Tags } {
  let result = [],
    pos = 0,
    tag = noTag;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (typeof child === "string") {
      let re = /<(\w+)>/g,
        m,
        at = 0,
        out = "";
      while ((m = re.exec(child))) {
        out += child.slice(at, m.index);
        pos += m.index - at;
        at = m.index + m[0].length;
        if (tag === noTag) tag = Object.create(null);
        tag[m[1]] = pos;
      }
      out += child.slice(at);
      pos += child.length - at;
      if (out) result.push(f(schema.text(out)));
    } else {
      if ((child as any).tag && (child as any).tag !== (Node.prototype as any).tag) {
        if (tag === noTag) tag = Object.create(null);
        for (const id in (child as any).tag)
          tag[id] =
            (child as any).tag[id] + ((child as any).flat || (child as any).isText ? 0 : 1) + pos;
      }
      if ((child as any).flat) {
        for (let j = 0; j < (child as any).flat.length; j++) {
          const node = f((child as any).flat[j]);
          pos += node.nodeSize;
          result.push(node);
        }
      } else {
        const node = f(child as Node);
        pos += node.nodeSize;
        result.push(node);
      }
    }
  }
  return { nodes: result, tag };
}

function id<T>(x: T): T {
  return x;
}

function takeAttrs(attrs: Attrs | null, args: [a?: Attrs | ChildSpec, ...b: ChildSpec[]]) {
  const a0 = args[0];
  if (!args.length || (a0 && (typeof a0 === "string" || a0 instanceof Node || a0.flat)))
    return attrs;

  args.shift();
  if (!attrs) return a0 as Attrs;
  if (!a0) return attrs;
  const result: Attrs = {};
  for (const prop in attrs) (result as any)[prop] = attrs[prop];
  for (const prop in a0 as Attrs) (result as any)[prop] = (a0 as Attrs)[prop];
  return result;
}

export type NodeBuilder = (
  attrsOrFirstChild?: Attrs | ChildSpec,
  ...children: ChildSpec[]
) => Node & { tag: Tags };
export type MarkBuilder = (
  attrsOrFirstChild?: Attrs | ChildSpec,
  ...children: ChildSpec[]
) => ChildSpec;

type Builders<S extends Schema> = {
  schema: S;
} & {
  [key in keyof S["nodes"]]: NodeBuilder;
} & {
  [key in keyof S["marks"]]: MarkBuilder;
} & {
  [name: string]: NodeBuilder | MarkBuilder;
};

/// Create a builder function for nodes with content.
function block(type: NodeType, attrs: Attrs | null = null): NodeBuilder {
  const result = (...args: any[]) => {
    const myAttrs = takeAttrs(attrs, args);
    const { nodes, tag } = flatten(type.schema, args as ChildSpec[], id);
    const node = type.create(myAttrs, nodes);
    if (tag !== noTag) (node as any).tag = tag;
    return node;
  };
  if (type.isLeaf)
    try {
      (result as any).flat = [type.create(attrs)];
    } catch (_) {}
  return result as NodeBuilder;
}

// Create a builder function for marks.
function mark(type: MarkType, attrs: Attrs | null): MarkBuilder {
  return (...args) => {
    const mark = type.create(takeAttrs(attrs, args));
    const { nodes, tag } = flatten(type.schema, args as ChildSpec[], (n) => {
      const newMarks = mark.addToSet(n.marks);
      return newMarks.length > n.marks.length ? n.mark(newMarks) : n;
    });
    return { flat: nodes, tag };
  };
}

export function builders<Nodes extends string = any, Marks extends string = any>(
  schema: Schema<Nodes, Marks>,
  names?: { [name: string]: Attrs },
) {
  const result = { schema };
  for (const name in schema.nodes) (result as any)[name] = block(schema.nodes[name], {});
  for (const name in schema.marks) (result as any)[name] = mark(schema.marks[name], {});

  if (names)
    for (const name in names) {
      let value = names[name],
        typeName = value.nodeType || value.markType || name,
        type;
      if ((type = schema.nodes[typeName])) (result as any)[name] = block(type, value);
      else if ((type = schema.marks[typeName])) (result as any)[name] = mark(type, value);
    }
  return result as Builders<Schema<Nodes, Marks>>;
}

export const schema = new Schema({
  nodes: addListNodes(bSchema.spec.nodes, "paragraph block*", "block"),
  marks: bSchema.spec.marks,
});

const b = builders(schema, {
  p: { nodeType: "paragraph" },
  pre: { nodeType: "code_block" },
  h1: { nodeType: "heading", level: 1 },
  h2: { nodeType: "heading", level: 2 },
  h3: { nodeType: "heading", level: 3 },
  li: { nodeType: "list_item" },
  ul: { nodeType: "bullet_list" },
  ol: { nodeType: "ordered_list" },
  br: { nodeType: "hard_break" },
  img: { nodeType: "image", src: "img.png" },
  hr: { nodeType: "horizontal_rule" },
  a: { markType: "link", href: "foo" },
}) as any;

export function eq<T extends { eq(other: T): boolean }>(a: T, b: T): boolean {
  return a.eq(b);
}

export const doc: NodeBuilder = b.doc;
export const p: NodeBuilder = b.p;
export const code_block: NodeBuilder = b.code_block;
export const pre: NodeBuilder = b.pre;
export const h1: NodeBuilder = b.h1;
export const h2: NodeBuilder = b.h2;
export const h3: NodeBuilder = b.h3;
export const li: NodeBuilder = b.li;
export const ul: NodeBuilder = b.ul;
export const ol: NodeBuilder = b.ol;
export const img: NodeBuilder = b.img;
export const hr: NodeBuilder = b.hr;
export const br: NodeBuilder = b.br;
export const blockquote: NodeBuilder = b.blockquote;
export const a: MarkBuilder = b.a;
export const em: MarkBuilder = b.em;
export const strong: MarkBuilder = b.strong;
export const code: MarkBuilder = b.code;
