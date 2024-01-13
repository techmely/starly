export function compareDeep(a: any, b: any) {
  if (a === b) return true;
  if (!(a && typeof a === "object") || !(b && typeof b === "object")) return false;
  const array = Array.isArray(a);
  if (Array.isArray(b) !== array) return false;
  if (array) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!compareDeep(a[i], b[i])) return false;
  } else {
    for (const p in a) if (!(p in b) || !compareDeep(a[p], b[p])) return false;
    for (const p in b) if (!(p in a)) return false;
  }
  return true;
}
