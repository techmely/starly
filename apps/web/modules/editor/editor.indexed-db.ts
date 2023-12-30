import type { Y } from "@blocksuite/store";
import { PassiveDocProvider } from "@blocksuite/store";
import { type IndexedDBProvider, createIndexedDBProvider } from "@toeverything/y-indexeddb";
import { EDITOR_INDEXED_DB_NAME } from "./editor.const";

export class EditorIndexedDBProvider implements PassiveDocProvider {
  public readonly flavour = "blocksuite-indexeddb";
  public readonly passive = true as const;
  private _connected = false;
  private _provider: IndexedDBProvider;
  constructor(doc: Y.Doc) {
    this._provider = createIndexedDBProvider(doc, EDITOR_INDEXED_DB_NAME);
  }
  connect() {
    this._provider.connect();
    this._connected = true;
  }
  disconnect() {
    this._provider.disconnect();
    this._connected = false;
  }
  get connected() {
    return this._connected;
  }
}
