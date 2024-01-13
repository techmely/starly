import {
  type Attrs,
  type ContentMatch,
  Fragment,
  type Mark,
  type Node,
  type NodeRange,
  type NodeType,
  Slice,
} from "techmely-editor-model";

import { ReplaceAroundStep, ReplaceStep } from "./replace_step";
import type { Transform } from "./transform";

function canCut(node: Node, start: number, end: number) {
  return (
    (start === 0 || node.canReplace(start, node.childCount)) &&
    (end === node.childCount || node.canReplace(0, end))
  );
}

/// Try to find a target depth to which the content in the given range
/// can be lifted. Will not go across
/// [isolating](#model.NodeSpec.isolating) parent nodes.
export function liftTarget(range: NodeRange): number | null {
  const parent = range.parent;
  const content = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (let depth = range.depth; ; --depth) {
    const node = range.$from.node(depth);
    const index = range.$from.index(depth),
      endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node.canReplace(index, endIndex, content)) return depth;
    if (depth === 0 || node.type.spec.isolating || !canCut(node, index, endIndex)) break;
  }
  return null;
}

export function lift(tr: Transform, range: NodeRange, target: number) {
  const { $from, $to, depth } = range;

  const gapStart = $from.before(depth + 1),
    gapEnd = $to.after(depth + 1);
  let start = gapStart,
    end = gapEnd;

  let before = Fragment.empty,
    openStart = 0;
  for (let d = depth, splitting = false; d > target; d--)
    if (splitting || $from.index(d) > 0) {
      splitting = true;
      before = Fragment.from($from.node(d).copy(before));
      openStart++;
    } else {
      start--;
    }
  let after = Fragment.empty,
    openEnd = 0;
  for (let d = depth, splitting = false; d > target; d--)
    if (splitting || $to.after(d + 1) < $to.end(d)) {
      splitting = true;
      after = Fragment.from($to.node(d).copy(after));
      openEnd++;
    } else {
      end++;
    }

  tr.step(
    new ReplaceAroundStep(
      start,
      end,
      gapStart,
      gapEnd,
      new Slice(before.append(after), openStart, openEnd),
      before.size - openStart,
      true,
    ),
  );
}

/// Try to find a valid way to wrap the content in the given range in a
/// node of the given type. May introduce extra nodes around and inside
/// the wrapper node, if necessary. Returns null if no valid wrapping
/// could be found. When `innerRange` is given, that range's content is
/// used as the content to fit into the wrapping, instead of the
/// content of `range`.
export function findWrapping(
  range: NodeRange,
  nodeType: NodeType,
  attrs: Attrs | null = null,
  innerRange = range,
): { type: NodeType; attrs: Attrs | null }[] | null {
  const around = findWrappingOutside(range, nodeType);
  const inner = around && findWrappingInside(innerRange, nodeType);
  if (!inner) return null;
  return (around!.map(withAttrs) as { type: NodeType; attrs: Attrs | null }[])
    .concat({ type: nodeType, attrs })
    .concat(inner.map(withAttrs));
}

function withAttrs(type: NodeType) {
  return { type, attrs: null };
}

function findWrappingOutside(range: NodeRange, type: NodeType) {
  const { parent, startIndex, endIndex } = range;
  const around = parent.contentMatchAt(startIndex).findWrapping(type);
  if (!around) return null;
  const outer = around.length ? around[0] : type;
  return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
}

function findWrappingInside(range: NodeRange, type: NodeType) {
  const { parent, startIndex, endIndex } = range;
  const inner = parent.child(startIndex);
  const inside = type.contentMatch.findWrapping(inner.type);
  if (!inside) return null;
  const lastType = inside.length ? inside[inside.length - 1] : type;
  let innerMatch: ContentMatch | null = lastType.contentMatch;
  for (let i = startIndex; innerMatch && i < endIndex; i++)
    innerMatch = innerMatch.matchType(parent.child(i).type);
  if (!innerMatch || !innerMatch.validEnd) return null;
  return inside;
}

export function wrap(
  tr: Transform,
  range: NodeRange,
  wrappers: readonly { type: NodeType; attrs?: Attrs | null }[],
) {
  let content = Fragment.empty;
  for (let i = wrappers.length - 1; i >= 0; i--) {
    if (content.size) {
      const match = wrappers[i].type.contentMatch.matchFragment(content);
      if (!match || !match.validEnd)
        throw new RangeError(
          "Wrapper type given to Transform.wrap does not form valid content of its parent wrapper",
        );
    }
    content = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }

  const start = range.start,
    end = range.end;
  tr.step(
    new ReplaceAroundStep(start, end, start, end, new Slice(content, 0, 0), wrappers.length, true),
  );
}

export function setBlockType(
  tr: Transform,
  from: number,
  to: number,
  type: NodeType,
  attrs: Attrs | null,
) {
  if (!type.isTextblock) throw new RangeError("Type given to setBlockType should be a textblock");
  const mapFrom = tr.steps.length;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (
      node.isTextblock &&
      !node.hasMarkup(type, attrs) &&
      canChangeType(tr.doc, tr.mapping.slice(mapFrom).map(pos), type)
    ) {
      // Ensure all markup that isn't allowed in the new node type is cleared
      tr.clearIncompatible(tr.mapping.slice(mapFrom).map(pos, 1), type);
      const mapping = tr.mapping.slice(mapFrom);
      const startM = mapping.map(pos, 1),
        endM = mapping.map(pos + node.nodeSize, 1);
      tr.step(
        new ReplaceAroundStep(
          startM,
          endM,
          startM + 1,
          endM - 1,
          new Slice(Fragment.from(type.create(attrs, null, node.marks)), 0, 0),
          1,
          true,
        ),
      );
      return false;
    }
  });
}

function canChangeType(doc: Node, pos: number, type: NodeType) {
  const $pos = doc.resolve(pos),
    index = $pos.index();
  return $pos.parent.canReplaceWith(index, index + 1, type);
}

/// Change the type, attributes, and/or marks of the node at `pos`.
/// When `type` isn't given, the existing node type is preserved,
export function setNodeMarkup(
  tr: Transform,
  pos: number,
  type: NodeType | undefined | null,
  attrs: Attrs | null,
  marks: readonly Mark[] | undefined,
) {
  const node = tr.doc.nodeAt(pos);
  if (!node) throw new RangeError("No node at given position");
  if (!type) type = node.type;
  const newNode = type.create(attrs, null, marks || node.marks);
  if (node.isLeaf) return tr.replaceWith(pos, pos + node.nodeSize, newNode);

  if (!type.validContent(node.content))
    throw new RangeError("Invalid content for node type " + type.name);

  tr.step(
    new ReplaceAroundStep(
      pos,
      pos + node.nodeSize,
      pos + 1,
      pos + node.nodeSize - 1,
      new Slice(Fragment.from(newNode), 0, 0),
      1,
      true,
    ),
  );
}

/// Check whether splitting at the given position is allowed.
export function canSplit(
  doc: Node,
  pos: number,
  depth = 1,
  typesAfter?: (null | { type: NodeType; attrs?: Attrs | null })[],
): boolean {
  const $pos = doc.resolve(pos),
    base = $pos.depth - depth;
  const innerType = (typesAfter && typesAfter[typesAfter.length - 1]) || $pos.parent;
  if (
    base < 0 ||
    $pos.parent.type.spec.isolating ||
    !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) ||
    !innerType.type.validContent(
      $pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount),
    )
  )
    return false;
  for (let d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
    const node = $pos.node(d),
      index = $pos.index(d);
    if (node.type.spec.isolating) return false;
    let rest = node.content.cutByIndex(index, node.childCount);
    const overrideChild = typesAfter && typesAfter[i + 1];
    if (overrideChild) rest = rest.replaceChild(0, overrideChild.type.create(overrideChild.attrs));
    const after = (typesAfter && typesAfter[i]) || node;
    if (!node.canReplace(index + 1, node.childCount) || !after.type.validContent(rest))
      return false;
  }
  const index = $pos.indexAfter(base);
  const baseType = typesAfter && typesAfter[0];
  return $pos
    .node(base)
    .canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type);
}

export function split(
  tr: Transform,
  pos: number,
  depth = 1,
  typesAfter?: (null | { type: NodeType; attrs?: Attrs | null })[],
) {
  let $pos = tr.doc.resolve(pos),
    before = Fragment.empty,
    after = Fragment.empty;
  for (let d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
    before = Fragment.from($pos.node(d).copy(before));
    const typeAfter = typesAfter && typesAfter[i];
    after = Fragment.from(
      typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after),
    );
  }
  tr.step(new ReplaceStep(pos, pos, new Slice(before.append(after), depth, depth), true));
}

/// Test whether the blocks before and after a given position can be
/// joined.
export function canJoin(doc: Node, pos: number): boolean {
  const $pos = doc.resolve(pos),
    index = $pos.index();
  return joinable($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
}

function joinable(a: Node | null, b: Node | null) {
  return !!(a && b && !a.isLeaf && a.canAppend(b));
}

/// Find an ancestor of the given position that can be joined to the
/// block before (or after if `dir` is positive). Returns the joinable
/// point, if any.
export function joinPoint(doc: Node, pos: number, dir = -1) {
  const $pos = doc.resolve(pos);
  for (let d = $pos.depth; ; d--) {
    let before,
      after,
      index = $pos.index(d);
    if (d === $pos.depth) {
      before = $pos.nodeBefore;
      after = $pos.nodeAfter;
    } else if (dir > 0) {
      before = $pos.node(d + 1);
      index++;
      after = $pos.node(d).maybeChild(index);
    } else {
      before = $pos.node(d).maybeChild(index - 1);
      after = $pos.node(d + 1);
    }
    if (
      before &&
      !before.isTextblock &&
      joinable(before, after) &&
      $pos.node(d).canReplace(index, index + 1)
    )
      return pos;
    if (d === 0) break;
    pos = dir < 0 ? $pos.before(d) : $pos.after(d);
  }
}

export function join(tr: Transform, pos: number, depth: number) {
  const step = new ReplaceStep(pos - depth, pos + depth, Slice.empty, true);
  tr.step(step);
}

/// Try to find a point where a node of the given type can be inserted
/// near `pos`, by searching up the node hierarchy when `pos` itself
/// isn't a valid place but is at the start or end of a node. Return
/// null if no position was found.
export function insertPoint(doc: Node, pos: number, nodeType: NodeType): number | null {
  const $pos = doc.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) return pos;

  if ($pos.parentOffset === 0)
    for (let d = $pos.depth - 1; d >= 0; d--) {
      const index = $pos.index(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.before(d + 1);
      if (index > 0) return null;
    }
  if ($pos.parentOffset === $pos.parent.content.size)
    for (let d = $pos.depth - 1; d >= 0; d--) {
      const index = $pos.indexAfter(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.after(d + 1);
      if (index < $pos.node(d).childCount) return null;
    }
  return null;
}

/// Finds a position at or around the given position where the given
/// slice can be inserted. Will look at parent nodes' nearest boundary
/// and try there, even if the original position wasn't directly at the
/// start or end of that node. Returns null when no position was found.
export function dropPoint(doc: Node, pos: number, slice: Slice): number | null {
  const $pos = doc.resolve(pos);
  if (!slice.content.size) return pos;
  let content = slice.content;
  for (let i = 0; i < slice.openStart; i++) content = content.firstChild!.content;
  for (let pass = 1; pass <= (slice.openStart === 0 && slice.size ? 2 : 1); pass++) {
    for (let d = $pos.depth; d >= 0; d--) {
      const bias =
        d === $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
      const insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
      let parent = $pos.node(d),
        fits: boolean | null = false;
      if (pass === 1) {
        fits = parent.canReplace(insertPos, insertPos, content);
      } else {
        const wrapping = parent.contentMatchAt(insertPos).findWrapping(content.firstChild!.type);
        fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
      }
      if (fits) return bias === 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
    }
  }
  return null;
}
