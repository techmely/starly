// Wrapper object to make writing state tests easier.

import { doc, eq, p, schema } from "techmely-editor-test-builder";
import type { Schema } from "../model";
import { PluginKey } from "./editor.model.plugin";
import { NodeSelection, TextSelection } from "./editor.model.selection";
import { EditorState } from "./editor.model.state";
import type { Command, Transaction } from "./editor.model.transaction";

export function selFor(doc: Node) {
  const a = (doc as any).tag.a;
  if (a !== null) {
    const $a = doc.resolve(a);
    if ($a.parent.inlineContent)
      return new TextSelection(
        $a,
        (doc as any).tag.b !== null ? doc.resolve((doc as any).tag.b) : undefined,
      );
    else return new NodeSelection($a);
  }
  return Selection.atStart(doc);
}

export class TestState {
  state: EditorState;
  constructor(config: { selection?: Selection; doc?: Node; schema?: Schema }) {
    if (!config.selection && config.doc) config.selection = selFor(config.doc);
    this.state = EditorState.create(config);
  }

  apply(tr: Transaction) {
    this.state = this.state.apply(tr);
  }

  command(cmd: Command) {
    cmd(this.state, (tr) => this.apply(tr));
  }

  type(text: string) {
    this.apply(this.tr.insertText(text));
  }

  deleteSelection() {
    this.apply(this.state.tr.deleteSelection());
  }

  textSel(anchor: number, head?: number) {
    const sel = TextSelection.create(this.state.doc, anchor, head);
    this.state = this.state.apply(this.state.tr.setSelection(sel));
  }

  nodeSel(pos: number) {
    const sel = NodeSelection.create(this.state.doc, pos);
    this.state = this.state.apply(this.state.tr.setSelection(sel));
  }

  get doc() {
    return this.state.doc;
  }
  get selection() {
    return this.state.selection;
  }
  get tr() {
    return this.state.tr;
  }
}

const messageCountKey = new PluginKey("messageCount");
const messageCountPlugin = new Plugin({
  key: messageCountKey,
  state: {
    init() {
      return 0;
    },
    apply(_, count) {
      return count + 1;
    },
    toJSON(count) {
      return count;
    },
    fromJSON(_, count) {
      return count;
    },
  },
  props: {
    testProp() {
      return this;
    },
  } as any,
});

const transactionPlugin = new Plugin({
  filterTransaction(tr) {
    return !tr.getMeta("filtered");
  },
  appendTransaction(trs, _, state) {
    const last = trs[trs.length - 1];
    if (last && last.getMeta("append")) return state.tr.insertText("A");
  },
});

describe("State", () => {
  it("creates a default doc", () => {
    const state = EditorState.create({ schema });
    ist(state.doc, doc(p()), eq);
  });

  it("creates a default selection", () => {
    const state = EditorState.create({ doc: doc(p("foo")) });
    ist(state.selection.from, 1);
    ist(state.selection.to, 1);
  });

  it("applies transform transactions", () => {
    const state = EditorState.create({ schema });
    const newState = state.apply(state.tr.insertText("hi"));
    ist(state.doc, doc(p()), eq);
    ist(newState.doc, doc(p("hi")), eq);
    ist(newState.selection.from, 3);
  });

  it("supports plugin fields", () => {
    const state = EditorState.create({ plugins: [messageCountPlugin], schema });
    const newState = state.apply(state.tr).apply(state.tr);
    ist(messageCountPlugin.getState(state), 0);
    ist(messageCountPlugin.getState(newState), 2);
  });

  it("can be serialized to JSON", () => {
    let state = EditorState.create({ plugins: [messageCountPlugin], doc: doc(p("ok")) });
    state = state.apply(state.tr.setSelection(TextSelection.create(state.doc, 3)));
    const pluginProps = { count: messageCountPlugin };
    const expected = {
      doc: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "ok" }] }],
      },
      selection: { type: "text", anchor: 3, head: 3 },
      count: 1,
    };
    const json = state.toJSON(pluginProps);
    ist(JSON.stringify(json), JSON.stringify(expected));
    const copy = EditorState.fromJSON({ plugins: [messageCountPlugin], schema }, json, pluginProps);
    ist(copy.doc, state.doc, eq);
    ist(copy.selection.from, 3);
    ist(messageCountPlugin.getState(copy), 1);

    const limitedJSON = state.toJSON();
    ist(limitedJSON.doc);
    ist(limitedJSON.messageCount$, undefined);
    const deserialized = EditorState.fromJSON(
      { plugins: [messageCountPlugin], schema },
      limitedJSON,
    );
    ist(messageCountPlugin.getState(deserialized), 0);
  });

  it("supports specifying and persisting storedMarks", () => {
    const state = EditorState.create({ doc: doc(p("ok")), storedMarks: [schema.mark("em")] });
    ist(state.storedMarks!.length, 1);
    const copy = EditorState.fromJSON({ schema }, state.toJSON());
    ist(copy.storedMarks!.length, 1);
  });

  it("supports reconfiguration", () => {
    const state = EditorState.create({ plugins: [messageCountPlugin], schema });
    ist(messageCountPlugin.getState(state), 0);
    const without = state.reconfigure({});
    ist(messageCountPlugin.getState(without), undefined);
    ist(without.plugins.length, 0);
    ist(without.doc, doc(p()), eq);
    const reAdd = without.reconfigure({ plugins: [messageCountPlugin] });
    ist(messageCountPlugin.getState(reAdd), 0);
    ist(reAdd.plugins.length, 1);
  });

  it("allows plugins to filter transactions", () => {
    const state = EditorState.create({ plugins: [transactionPlugin], schema });
    let applied = state.applyTransaction(state.tr.insertText("X"));
    ist(applied.state.doc, doc(p("X")), eq);
    ist(applied.transactions.length, 1);
    applied = state.applyTransaction(state.tr.insertText("Y").setMeta("filtered", true));
    ist(applied.state, state);
    ist(applied.transactions.length, 0);
  });

  it("allows plugins to append transactions", () => {
    const state = EditorState.create({ plugins: [transactionPlugin], schema });
    const applied = state.applyTransaction(state.tr.insertText("X").setMeta("append", true));
    ist(applied.state.doc, doc(p("XA")), eq);
    ist(applied.transactions.length, 2);
  });

  it("stores a reference to a root transaction for appended transactions", () => {
    const state = EditorState.create({
      schema,
      plugins: [
        new Plugin({
          appendTransaction: (_trs, _oldState, newState) => newState.tr.insertText("Y"),
        }),
      ],
    });
    const { transactions } = state.applyTransaction(state.tr.insertText("X"));
    ist(transactions.length, 2);
    ist(transactions[1].getMeta("appendedTransaction"), transactions[0]);
  });

  it("supports JSON.stringify toJSON arguments", () => {
    const someObject = { someKey: EditorState.create({ schema }) };
    ist(JSON.stringify(someObject).length > 0);
  });
});

describe("Plugin", () => {
  it("calls prop functions bound to the plugin", () => {
    ist((messageCountPlugin.props as any).testProp(), messageCountPlugin);
  });

  it("can be found by key", () => {
    const state = EditorState.create({ plugins: [messageCountPlugin], schema });
    ist(messageCountKey.get(state), messageCountPlugin);
    ist(messageCountKey.getState(state), 0);
  });

  it("generates new keys", () => {
    const p1 = new Plugin({}),
      p2 = new Plugin({});
    ist(p1.key !== p2.key);
    const k1 = new PluginKey("foo"),
      k2 = new PluginKey("foo");
    ist(k1.key !== k2.key);
  });
});
