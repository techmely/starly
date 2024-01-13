import type { Fragment } from "./editor.model.fragment";

export function findDiffStart(a: Fragment, b: Fragment, pos: number): number | null {
  for (let i = 0; ; i++) {
    if (i === a.childCount || i === b.childCount) return a.childCount === b.childCount ? null : pos;

    const childA = a.child(i);
    const childB = b.child(i);
    if (childA === childB) {
      pos += childA.nodeSize;
      continue;
    }

    if (!childA.sameMarkup(childB)) return pos;

    if (childA.isText && childA.text !== childB.text && childA.text && childB.text) {
      for (let j = 0; childA.text[j] === childB.text[j]; j++) {
        pos++;
      }
      return pos;
    }
    if (childA.content.size || childB.content.size) {
      const inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner !== null) return inner;
    }
    pos += childA.nodeSize;
  }
}

export function findDiffEnd(
  a: Fragment,
  b: Fragment,
  posA: number,
  posB: number,
): { a: number; b: number } | null {
  for (let iA = a.childCount, iB = b.childCount; ; ) {
    if (iA === 0 || iB === 0) return iA === iB ? null : { a: posA, b: posB };

    const childA = a.child(--iA);
    const childB = b.child(--iB);
    const size = childA.nodeSize;

    if (childA === childB) {
      posA -= size;
      posB -= size;
      continue;
    }

    if (!childA.sameMarkup(childB)) return { a: posA, b: posB };

    if (childA.isText && childA.text !== childB.text && childA.text && childB.text) {
      let same = 0;
      const minSize = Math.min(childA.text.length, childB.text.length);
      while (
        same < minSize &&
        childA.text[childA.text.length - same - 1] === childB.text[childB.text.length - same - 1]
      ) {
        same++;
        posA--;
        posB--;
      }
      return { a: posA, b: posB };
    }
    if (childA.content.size || childB.content.size) {
      const inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner) return inner;
    }
    posA -= size;
    posB -= size;
  }
}
