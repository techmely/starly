import "@blocksuite/blocks";
import "@blocksuite/editor";
import "@blocksuite/editor/themes/affine.css";

import { AffineSchemas, __unstableSchemas } from "@blocksuite/blocks";
import { ContentParser } from "@blocksuite/blocks/content-parser";
import std from "@blocksuite/blocks/std";
import { EditorContainer } from "@blocksuite/editor";
import type { BlockSuiteRoot } from "@blocksuite/lit";
import type { Page, WorkspaceOptions } from "@blocksuite/store";
import {
  type BlobStorage,
  type DocProviderCreator,
  Generator,
  Schema,
  Workspace,
  createIndexeddbStorage,
  createMemoryStorage,
} from "@blocksuite/store";
import { createBroadcastChannelProvider } from "@blocksuite/store/providers/broadcast-channel";
import { EDITOR_INDEXED_DB_NAME } from "./editor.const";
import { EditorIndexedDBProvider } from "./editor.indexed-db";
import { InitFn } from "./presets/utils";

const params = new URLSearchParams(location.search);
const room = params.get("room") ?? Math.random().toString(16).slice(2, 8);
const providerArgs = (params.get("providers") ?? "bc").split(",");
const blobStorageArgs = (params.get("blobStorage") ?? "memory").split(",");
const featureArgs = (params.get("features") ?? "").split(",");

const options = createWorkSpaceOptions();

export async function initEditor() {
  if (window.workspace) {
    return;
  }
  const workspace = new Workspace(options);
  window.workspace = workspace;
  window.blockSchemas = AffineSchemas;
  window.Y = Workspace.Y;
  window.std = std;
  window.ContentParser = ContentParser;

  Object.defineProperty(globalThis, "root", {
    get() {
      return document.querySelector("block-suite-root") as BlockSuiteRoot;
    },
  });
  workspace.awarenessStore.setFlag("enable_page_tags", true);

  subscribePage(workspace);
  initWorkspace(workspace);
}

async function initWorkspace(workspace: Workspace) {
  const databaseExists = await checkIDBExistence();

  const shouldInit = (!databaseExists && !params.get("room")) || params.get("init");

  if (shouldInit) {
    const deleteResult = await new Promise((resovle) => {
      const req = indexedDB.deleteDatabase(EDITOR_INDEXED_DB_NAME);
      req.onerror = resovle;
      req.onblocked = resovle;
      req.onsuccess = resovle;
    });

    console.info("Delete database: ", deleteResult);

    await syncProviders(workspace, getProviderCreators());
    await initContentByInitParam(workspace, params.get("init") ?? "empty", "page0");
  } else {
    await syncProviders(workspace, getProviderCreators());
  }
}

async function loadPresets() {
  const presetMap = new Map<string, InitFn>();
  const presets = await import("./presets/index");
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.values(presets as Record<string, InitFn>).forEach((fn) => presetMap.set(fn.id, fn));

  return presetMap;
}

async function initContentByInitParam(workspace: Workspace, param: string, pageId: string) {
  const presetsMap = await loadPresets();

  // biome-ignore lint/style/noParameterAssign: I don't care 😆
  if (!presetsMap.has(param)) param = "empty";

  // Load built-in init function when `?init=heavy` param provided
  if (presetsMap.has(param)) {
    presetsMap.get(param)?.(workspace, pageId);
    const page = workspace.getPage(pageId);
    await page?.waitForLoaded();
    page?.resetHistory();
  }
}

function getProviderCreators() {
  const providerCreators: DocProviderCreator[] = [];

  if (!params.get("room")) {
    providerCreators.push((_id, doc) => new EditorIndexedDBProvider(doc));
  }

  return providerCreators;
}

async function syncProviders(workspace: Workspace, providerCreators: DocProviderCreator[]) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  providerCreators.forEach((fn) => workspace.registerProvider(fn));
  const providers = workspace.providers;

  for (const provider of providers) {
    if ("active" in provider) {
      provider.sync();
      await provider.whenReady;
    } else if ("passive" in provider) {
      provider.connect();
    }
  }

  const oldVersions = { ...workspace.meta.blockVersions };

  let run = true;
  const runWorkspaceMigration = () => {
    if (run) {
      workspace.schema.upgradeWorkspace(workspace.doc);
      run = false;
    }
  };

  workspace.slots.pageAdded.on(async (pageId) => {
    const page = workspace.getPage(pageId) as Page;
    await page.waitForLoaded(() => {
      runWorkspaceMigration();
      workspace.schema.upgradePage(oldVersions, page.spaceDoc);
    });
  });
}

async function checkIDBExistence() {
  return new Promise<boolean>((resolve) => {
    const request = indexedDB.open(EDITOR_INDEXED_DB_NAME);
    request.onupgradeneeded = (e) => {
      request.transaction?.abort();
      request.result.close();
      resolve(false);
    };
    request.onsuccess = (e) => {
      request.result.close();
      resolve(true);
    };
  });
}

function subscribePage(workspace: Workspace) {
  workspace.slots.pageAdded.once((pageId) => {
    if (typeof globalThis.targetPageId === "string") {
      if (pageId !== globalThis.targetPageId) {
        // if there's `targetPageId` which not same as the `pageId`
        return;
      }
    }
    const app = document.getElementById("mount-editor");
    if (!app) {
      return;
    }
    const page = workspace.getPage(pageId) as Page;

    const editor = createEditor(page, app);
    const contentParser = new ContentParser(page);
    // contentParser.
    // const debugMenu = new DebugMenu();
    // debugMenu.workspace = workspace;
    // debugMenu.editor = editor;
    // debugMenu.mode = defaultMode;
    // debugMenu.contentParser = contentParser;
    // document.body.appendChild(debugMenu);

    window.editor = editor;
    window.page = page;
  });
}

function createEditor(page: Page, element: HTMLElement) {
  const editor = new EditorContainer();
  editor.page = page;
  editor.slots.pageLinkClicked.on(({ pageId }) => {
    const target = page.workspace.getPage(pageId);
    if (!target) {
      throw new Error(`Failed to jump to page ${pageId}`);
    }
    editor.page = target;
  });

  element.append(editor);

  editor.createBlockHub().then((blockHub) => {
    document.body.appendChild(blockHub);
  });
  return editor;
}

export function createWorkSpaceOptions(): WorkspaceOptions {
  const providerCreators: DocProviderCreator[] = [];
  const blobStorages: ((id: string) => BlobStorage)[] = [];
  const schema = new Schema();
  schema.register(AffineSchemas).register(__unstableSchemas);

  let idGenerator: Generator = Generator.AutoIncrement;

  if (providerArgs.includes("idb")) {
    providerCreators.push((_id, doc) => new EditorIndexedDBProvider(doc));
    idGenerator = Generator.NanoID; // Works in production
  }

  if (providerArgs.includes("bc")) {
    providerCreators.push(createBroadcastChannelProvider);
    idGenerator = Generator.NanoID; // Works in production
  }

  if (blobStorageArgs.includes("memory")) {
    blobStorages.push(createMemoryStorage);
  }

  if (blobStorageArgs.includes("idb")) {
    blobStorages.push(createIndexeddbStorage);
  }

  return {
    id: room,
    schema,
    providerCreators,
    idGenerator,
    blobStorages,
    defaultFlags: {
      enable_toggle_block: featureArgs.includes("toggle"),
      enable_set_remote_flag: true,
      enable_drag_handle: true,
      enable_block_hub: true,
      enable_database: true,
      enable_edgeless_toolbar: true,
      enable_linked_page: true,
      enable_bookmark_operation: true,
      enable_note_index: true,
      enable_attachment_block: true,
      readonly: {
        "space:page0": false,
      },
    },
  };
}
