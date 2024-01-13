import ist from "ist";
import { Schema } from "techmely-editor-model";
import { EditorState } from "techmely-editor-state";
import { doc, em, hr, li, p, schema, strong, ul } from "techmely-editor-test-builder";
import { EditorView } from "techmely-editor-view";
import { tempEditor } from "./view";

const space = document.querySelector("#workspace")!;

describe("EditorView", () => {
  it("can mount an existing node", () => {
    const dom = space.appendChild(document.createElement("article"));
    const view = new EditorView(
      { mount: dom },
      {
        state: EditorState.create({ doc: doc(p("hi")) }),
      },
    );
    ist(view.dom, dom);
    ist(dom.contentEditable, "true");
    ist(dom.firstChild!.nodeName, "P");
    view.destroy();
    ist(dom.contentEditable, "inherit");
    space.removeChild(dom);
  });

  it("reflects the current state in .props", () => {
    const view = tempEditor();
    ist(view.state, view.props.state);
    view.dispatch(view.state.tr.insertText("x"));
    ist(view.state, view.props.state);
  });

  it("can update props with setProp", () => {
    const view = tempEditor({ scrollThreshold: 100 });
    view.setProps({
      scrollThreshold: undefined,
      scrollMargin: 10,
      state: view.state.apply(view.state.tr.insertText("y")),
    });
    ist(view.state.doc.content.size, 3);
    ist(view.props.scrollThreshold, null);
    ist(view.props.scrollMargin, 10);
  });

  it("can update with a state using a different schema", () => {
    const testSchema = new Schema({ nodes: schema.spec.nodes });
    const view = tempEditor({ doc: doc(p(strong("foo"))) });
    view.updateState(EditorState.create({ doc: (testSchema.nodes as any).doc.createAndFill() }));
    ist(!view.dom.querySelector("strong"));
  });

  it("calls handleScrollToSelection when appropriate", () => {
    let called = 0;
    const view = tempEditor({
      doc: doc(p("foo")),
      handleScrollToSelection() {
        called++;
        return false;
      },
    });
    view.dispatch(view.state.tr.scrollIntoView());
    ist(called, 1);
  });

  it("can be queried for the DOM position at a doc position", () => {
    const view = tempEditor({ doc: doc(ul(li(p(strong("foo"))))) });
    const inText = view.domAtPos(4);
    ist(inText.offset, 1);
    ist(inText.node.nodeValue, "foo");
    const beforeLI = view.domAtPos(1);
    ist(beforeLI.offset, 0);
    ist(beforeLI.node.nodeName, "UL");
    const afterP = view.domAtPos(7);
    ist(afterP.offset, 1);
    ist(afterP.node.nodeName, "LI");
  });

  it("can bias DOM position queries to enter nodes", () => {
    const view = tempEditor({ doc: doc(p(em(strong("a"), "b"), "c")) });
    const get = (pos: number, bias: number) => {
      const r = view.domAtPos(pos, bias);
      return (r.node.nodeType === 1 ? r.node.nodeName : r.node.nodeValue) + "@" + r.offset;
    };
    ist(get(1, 0), "P@0");
    ist(get(1, -1), "P@0");
    ist(get(1, 1), "a@0");
    ist(get(2, -1), "a@1");
    ist(get(2, 0), "EM@1");
    ist(get(2, 1), "b@0");
    ist(get(3, -1), "b@1");
    ist(get(3, 0), "P@1");
    ist(get(3, 1), "c@0");
    ist(get(4, -1), "c@1");
    ist(get(4, 0), "P@2");
    ist(get(4, 1), "P@2");
  });

  it("can be queried for a node's DOM representation", () => {
    const view = tempEditor({ doc: doc(p("foo"), hr()) });
    ist(view.nodeDOM(0)!.nodeName, "P");
    ist(view.nodeDOM(5)!.nodeName, "HR");
    ist(view.nodeDOM(3), null);
  });

  it("can map DOM positions to doc positions", () => {
    const view = tempEditor({ doc: doc(p("foo"), hr()) });
    ist(view.posAtDOM(view.dom.firstChild!.firstChild!, 2), 3);
    ist(view.posAtDOM(view.dom, 1), 5);
    ist(view.posAtDOM(view.dom, 2), 6);
    ist(view.posAtDOM(view.dom.lastChild!, 0, -1), 5);
    ist(view.posAtDOM(view.dom.lastChild!, 0, 1), 6);
  });

  it("binds this to itself in dispatchTransaction prop", () => {
    const dom = document.createElement("div");
    let thisBinding;
    const view = new EditorView(dom, {
      state: EditorState.create({ doc: doc(p("hi")) }),
      dispatchTransaction: function () {
        thisBinding = this;
      },
    });
    view.dispatch(view.state.tr.insertText("x"));
    ist(view, thisBinding);
  });
});
