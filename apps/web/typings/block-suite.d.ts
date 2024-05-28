import type { ContentParser } from "@blocksuite/blocks/content-parser";
import std from "@blocksuite/blocks/std";
import type { EditorContainer } from "@blocksuite/editor";
import type { BlockSchema, Page, Workspace } from "@blocksuite/store";

declare global {
  interface Window {
    // Block Suite Editor
    editor: EditorContainer;
    page: Page;
    workspace: Workspace;
    ContentParser: typeof ContentParser;
    Y: typeof Workspace.Y;
    std: typeof std;
  }
}
