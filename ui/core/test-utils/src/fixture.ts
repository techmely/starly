import type { LitElement } from "lit";
import { isTemplateResult } from "lit/directive-helpers";
import { render as defaultRender } from "lit/html";
import type { FixtureOptions, LitHTMLRenderable } from "./types";

export const cachedWrappers: Element[] = [];
export const NODE_TYPES = Object.freeze({
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_FRAGMENT_NODE: 11,
});

const isUsefulNode = ({ nodeType, textContent }: ChildNode) => {
  switch (nodeType) {
    case NODE_TYPES.COMMENT_NODE:
      return false;
    case NODE_TYPES.TEXT_NODE:
      return textContent?.trim();
    default:
      return true;
  }
};

function fixtureWrapper(parentNode: HTMLElement = document.createElement("div")) {
  document.body.appendChild(parentNode);
  cachedWrappers.push(parentNode);
  return parentNode;
}

export function fixtureCleanup() {
  for (const wrapper of cachedWrappers) {
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  }
  cachedWrappers.length = 0;
}

function stringFixtureSync(template: string) {
  const parentNode = fixtureWrapper();
  parentNode.innerHTML = template;
  return parentNode.children[0] as Element;
}

function litFixtureSync(template: LitHTMLRenderable, options?: FixtureOptions) {
  const wrapper = fixtureWrapper(options?.parentNode);
  const render = options?.render || defaultRender;

  render(template, wrapper);

  if (isTemplateResult(template)) {
    return wrapper.firstElementChild;
  }

  const [node] = Array.from(wrapper.childNodes).filter(isUsefulNode);

  return node;
}

export async function updateElementCompleted(el: LitElement) {
  await el.updateComplete;
  // @ts-ignore
  if (window.ShadyDOM && typeof window.ShadyDOM.flush === "function") {
    // @ts-ignore
    window.ShadyDOM.flush();
  }
  return el;
}

export async function fixture<T extends LitElement>(
  template: LitHTMLRenderable,
  options?: FixtureOptions,
) {
  if (typeof template === "string") {
    const el = stringFixtureSync(template) as T;
    await updateElementCompleted(el);
    return el;
  }
  if (typeof template === "object") {
    const el = litFixtureSync(template, options) as T;
    await updateElementCompleted(el);
    return el;
  }
  throw new Error("Invalid template type - only string or lit-html templates are supported");
}
