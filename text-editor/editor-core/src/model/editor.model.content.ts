import { Fragment } from "./editor.model.fragment";
import type { NodeType } from "./editor.model.schema";

type MatchEdge = { type: NodeType; next: ContentMatch };

/// Instances of this class represent a match state of a node type's
/// [content expression](#model.NodeSpec.content), and can be used to
/// find out whether further content matches here, and whether a given
/// position is a valid end of the node.
export class ContentMatch {
  /// @internal
  readonly next: MatchEdge[] = [];
  /// @internal
  readonly wrapCache: (NodeType | readonly NodeType[] | null)[] = [];

  /// @internal
  constructor(
    /// True when this match state represents a valid end of the node.
    readonly validEnd: boolean,
  ) {}

  /// @internal
  static parse(string: string, nodeTypes: { readonly [name: string]: NodeType }): ContentMatch {
    const stream = new TokenStream(string, nodeTypes);
    if (stream.next === null) return ContentMatch.empty;
    const expr = parseExpr(stream);
    if (stream.next) stream.err("Unexpected trailing text");
    const match = dfa(nfa(expr));
    if (!match) throw new Error("Do not have content match");
    checkForDeadEnds(match, stream);
    return match;
  }

  /// Match a node type, returning a match after that node if
  /// successful.
  matchType(type: NodeType): ContentMatch | null {
    for (let i = 0; i < this.next.length; i++)
      if (this.next[i].type === type) return this.next[i].next;
    return null;
  }

  /// Try to match a fragment. Returns the resulting match when
  /// successful.
  matchFragment(frag: Fragment, start = 0, end = frag.childCount): ContentMatch | null {
    let cur: ContentMatch | null = this;
    for (let i = start; cur && i < end; i++) cur = cur.matchType(frag.child(i).type);
    return cur;
  }

  /// @internal
  get inlineContent() {
    return this.next.length !== 0 && this.next[0].type.isInline;
  }

  /// Get the first matching node type at this match position that can
  /// be generated.
  get defaultType(): NodeType | null {
    for (let i = 0; i < this.next.length; i++) {
      const { type } = this.next[i];
      if (!(type.isText || type.hasRequiredAttrs())) return type;
    }
    return null;
  }

  /// @internal
  compatible(other: ContentMatch) {
    for (let i = 0; i < this.next.length; i++)
      for (let j = 0; j < other.next.length; j++)
        if (this.next[i].type === other.next[j].type) return true;
    return false;
  }

  /// Try to match the given fragment, and if that fails, see if it can
  /// be made to match by inserting nodes in front of it. When
  /// successful, return a fragment of inserted nodes (which may be
  /// empty if nothing had to be inserted). When `toEnd` is true, only
  /// return a fragment if the resulting match goes to the end of the
  /// content expression.
  fillBefore(after: Fragment, toEnd = false, startIndex = 0): Fragment | null {
    const seen: ContentMatch[] = [this];
    function search(match: ContentMatch, types: readonly NodeType[]): Fragment | null {
      const finished = match.matchFragment(after, startIndex);
      if (finished && (!toEnd || finished.validEnd)) {
        const nodes = types.flatMap((tp) => {
          const node = tp.createAndFill();
          if (node) return node;
          return [];
        });
        return Fragment.from(nodes);
      }

      for (let i = 0; i < match.next.length; i++) {
        const { type, next } = match.next[i];
        if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) === -1) {
          seen.push(next);
          const found = search(next, types.concat(type));
          if (found) return found;
        }
      }
      return null;
    }

    return search(this, []);
  }

  /// Find a set of wrapping node types that would allow a node of the
  /// given type to appear at this position. The result may be empty
  /// (when it fits directly) and will be null when no such wrapping
  /// exists.
  findWrapping(target: NodeType): readonly NodeType[] | null {
    for (let i = 0; i < this.wrapCache.length; i += 2)
      if (this.wrapCache[i] === target) return this.wrapCache[i + 1] as readonly NodeType[] | null;
    const computed = this.computeWrapping(target);
    this.wrapCache.push(target, computed);
    return computed;
  }

  /// @internal
  computeWrapping(target: NodeType): readonly NodeType[] | null {
    type Active = { match: ContentMatch; type: NodeType | null; via: Active | null };
    const seen = Object.create(null);
    const active: Active[] = [{ match: this, type: null, via: null }];
    while (active.length) {
      const current = active.shift();
      const match = current?.match;
      if (!match) continue;

      if (match.matchType(target)) {
        const result: NodeType[] = [];
        // @ts-expect-error I don't know how to handle this lol
        for (let obj = current; obj.type; obj = obj.via) result.push(obj.type);
        return result.reverse();
      }
      for (let i = 0; i < match.next.length; i++) {
        const { type, next } = match.next[i];
        if (
          !type.isLeaf &&
          !type.hasRequiredAttrs() &&
          !(type.name in seen) &&
          (!current.type || next.validEnd)
        ) {
          active.push({ match: type.contentMatch, type, via: current });
          seen[type.name] = true;
        }
      }
    }
    return null;
  }

  /// The number of outgoing edges this node has in the finite
  /// automaton that describes the content expression.
  get edgeCount() {
    return this.next.length;
  }

  /// Get the _n_​th outgoing edge from this node in the finite
  /// automaton that describes the content expression.
  edge(n: number): MatchEdge {
    if (n >= this.next.length) throw new RangeError(`There's no ${n}th edge in this content match`);
    return this.next[n];
  }

  /// @internal
  toString() {
    const seen: ContentMatch[] = [];
    function scan(m: ContentMatch) {
      seen.push(m);
      for (let i = 0; i < m.next.length; i++)
        if (seen.indexOf(m.next[i].next) === -1) scan(m.next[i].next);
    }
    scan(this);
    return seen
      .map((m, i) => {
        let out = `${i + (m.validEnd ? "*" : " ")} `;
        for (let i = 0; i < m.next.length; i++)
          out += `${(i ? ", " : "") + m.next[i].type.name}->${seen.indexOf(m.next[i].next)}`;
        return out;
      })
      .join("\n");
  }

  /// @internal
  static empty = new ContentMatch(true);
}

class TokenStream {
  inline: boolean | null = null;
  pos = 0;
  tokens: string[];

  constructor(
    readonly string: string,
    readonly nodeTypes: { readonly [name: string]: NodeType },
  ) {
    this.tokens = string.split(/\s*(?=\b|\W|$)/);
    if (this.tokens[this.tokens.length - 1] === "") this.tokens.pop();
    if (this.tokens[0] === "") this.tokens.shift();
  }

  get next() {
    return this.tokens[this.pos];
  }

  eat(tok: string) {
    return this.next === tok && (this.pos++ || true);
  }

  err(str: string): never {
    throw new SyntaxError(`${str} (in content expression '${this.string}')`);
  }
}

type Expr =
  | { type: "choice"; exprs: Expr[] }
  | { type: "seq"; exprs: Expr[] }
  | { type: "plus"; expr: Expr }
  | { type: "star"; expr: Expr }
  | { type: "opt"; expr: Expr }
  | { type: "range"; min: number; max: number; expr: Expr }
  | { type: "name"; value: NodeType };

function parseExpr(stream: TokenStream): Expr {
  const exprs = [];
  do {
    exprs.push(parseExprSeq(stream));
  } while (stream.eat("|"));
  return exprs.length === 1 ? exprs[0] : { type: "choice", exprs };
}

function parseExprSeq(stream: TokenStream): Expr {
  const exprs = [];
  do {
    exprs.push(parseExprSubscript(stream));
  } while (stream.next && stream.next !== ")" && stream.next !== "|");
  return exprs.length === 1 ? exprs[0] : { type: "seq", exprs };
}

function parseExprSubscript(stream: TokenStream): Expr {
  let expr = parseExprAtom(stream);
  for (;;) {
    if (stream.eat("+")) expr = { type: "plus", expr };
    else if (stream.eat("*")) expr = { type: "star", expr };
    else if (stream.eat("?")) expr = { type: "opt", expr };
    else if (stream.eat("{")) expr = parseExprRange(stream, expr);
    else break;
  }
  return expr;
}

function parseNum(stream: TokenStream) {
  if (/\D/.test(stream.next)) stream.err(`Expected number, got '${stream.next}'`);
  const result = Number(stream.next);
  stream.pos++;
  return result;
}

function parseExprRange(stream: TokenStream, expr: Expr): Expr {
  const min = parseNum(stream);
  let max = min;
  if (stream.eat(",")) {
    if (stream.next !== "}") max = parseNum(stream);
    else max = -1;
  }
  if (!stream.eat("}")) stream.err("Unclosed braced range");
  return { type: "range", min, max, expr };
}

function resolveName(stream: TokenStream, name: string): readonly NodeType[] {
  const types = stream.nodeTypes;
  const type = types[name];
  if (type) return [type];
  const result = [];
  for (const typeName in types) {
    const type = types[typeName];
    if (type.groups.indexOf(name) > -1) result.push(type);
  }
  if (result.length === 0) stream.err(`No node type or group '${name}' found`);
  return result;
}

function parseExprAtom(stream: TokenStream): Expr {
  if (stream.eat("(")) {
    const expr = parseExpr(stream);
    if (!stream.eat(")")) stream.err("Missing closing paren");
    return expr;
  }
  if (!/\W/.test(stream.next)) {
    const exprs = resolveName(stream, stream.next).map((type) => {
      if (stream.inline === null) stream.inline = type.isInline;
      else if (stream.inline !== type.isInline) stream.err("Mixing inline and block content");
      return { type: "name", value: type } as Expr;
    });
    stream.pos++;
    return exprs.length === 1 ? exprs[0] : { type: "choice", exprs };
  }
  stream.err(`Unexpected token '${stream.next}'`);
}

// The code below helps compile a regular-expression-like language
// into a deterministic finite automaton. For a good introduction to
// these concepts, see https://swtch.com/~rsc/regexp/regexp1.html

type Edge = { term: NodeType | undefined; to: number | undefined };

/// Construct an NFA from an expression as returned by the parser. The
/// NFA is represented as an array of states, which are themselves
/// arrays of edges, which are `{term, to}` objects. The first state is
/// the entry state and the last node is the success state.
///
/// Note that unlike typical NFAs, the edge ordering in this one is
/// significant, in that it is used to contruct filler content when
/// necessary.
function nfa(expr: Expr): Edge[][] {
  const nfa: Edge[][] = [[]];
  connect(compile(expr, 0), node());
  return nfa;

  function node() {
    return nfa.push([]) - 1;
  }
  function edge(from: number, to?: number, term?: NodeType) {
    const edge = { term, to };
    nfa[from].push(edge);
    return edge;
  }

  function connect(edges: Edge[], to: number) {
    for (const edge of edges) {
      edge.to = to;
    }
  }

  function compile(expr: Expr, from: number): Edge[] {
    if (expr.type === "choice") {
      return expr.exprs.reduce((out, expr) => out.concat(compile(expr, from)), [] as Edge[]);
    }
    if (expr.type === "seq") {
      for (let i = 0; ; i++) {
        const next = compile(expr.exprs[i], from);
        if (i === expr.exprs.length - 1) return next;
        from = node();
        connect(next, from);
      }
    } else if (expr.type === "star") {
      const loop = node();
      edge(from, loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)];
    } else if (expr.type === "plus") {
      const loop = node();
      connect(compile(expr.expr, from), loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)];
    } else if (expr.type === "opt") {
      return [edge(from)].concat(compile(expr.expr, from));
    } else if (expr.type === "range") {
      let cur = from;
      for (let i = 0; i < expr.min; i++) {
        const next = node();
        connect(compile(expr.expr, cur), next);
        cur = next;
      }
      if (expr.max === -1) {
        connect(compile(expr.expr, cur), cur);
      } else {
        for (let i = expr.min; i < expr.max; i++) {
          const next = node();
          edge(cur, next);
          connect(compile(expr.expr, cur), next);
          cur = next;
        }
      }
      return [edge(cur)];
    } else if (expr.type === "name") {
      return [edge(from, undefined, expr.value)];
    } else {
      throw new Error("Unknown expr type");
    }
  }
}

function cmp(a: number, b: number) {
  return b - a;
}

// Get the set of nodes reachable by null edges from `node`. Omit
// nodes with only a single null-out-edge, since they may lead to
// needless duplicated nodes.
function nullFrom(nfa: Edge[][], node: number): readonly number[] {
  const result: number[] = [];
  scan(node);
  return result.sort(cmp);

  function scan(node: number) {
    const edges = nfa[node];
    if (edges.length === 1 && !edges[0].term) {
      const edgeTo = edges[0].to;
      if (edgeTo) scan(edgeTo);
    }
    result.push(node);
    for (let i = 0; i < edges.length; i++) {
      const { term, to } = edges[i];
      if (to && !term && result.indexOf(to) === -1) scan(to);
    }
  }
}

// Compiles an NFA as produced by `nfa` into a DFA, modeled as a set
// of state objects (`ContentMatch` instances) with transitions
// between them.
function dfa(nfa: Edge[][]) {
  const labeled = Object.create(null);
  const xxx = nullFrom(nfa, 0);
  return explore(xxx);

  function explore(states: readonly number[]) {
    const out: [NodeType, number[]][] = [];

    for (const node of states) {
      for (const { term, to } of nfa[node]) {
        if (!term) return;
        let set: number[] | undefined;
        for (let i = 0; i < out.length; i++) if (out[i][0] === term) set = out[i][1];
        if (to) {
          const nodeEdges = nullFrom(nfa, to);
          for (const node of nodeEdges) {
            if (!set) {
              set = [];
              out.push([term, set]);
            }
            if (set.indexOf(node) === -1) set.push(node);
          }
        }
      }
    }

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    const state = (labeled[states.join(",")] = new ContentMatch(
      states.indexOf(nfa.length - 1) > -1,
    ));
    for (let i = 0; i < out.length; i++) {
      const states = out[i][1].sort(cmp);
      state.next.push({ type: out[i][0], next: labeled[states.join(",")] || explore(states) });
    }
    return state;
  }
}

function checkForDeadEnds(match: ContentMatch, stream: TokenStream) {
  for (let i = 0, work = [match]; i < work.length; i++) {
    const state = work[i];
    let dead = !state.validEnd;
    const nodes = [];
    for (let j = 0; j < state.next.length; j++) {
      const { type, next } = state.next[j];
      nodes.push(type.name);
      if (dead && !(type.isText || type.hasRequiredAttrs())) dead = false;
      if (work.indexOf(next) === -1) work.push(next);
    }
    if (dead)
      stream.err(
        `Only non-generatable nodes (${nodes.join(
          ", ",
        )}) in a required position (see https://techmely.net/docs/guide/#generatable)`,
      );
  }
}
