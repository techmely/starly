import { type CSSResultGroup, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class MelyElement extends LitElement {
  static elementName = "";
  static version = `${this.elementName}-__PKG_VERSION__`;
  static dependencies: Record<string, typeof MelyElement> = {};

  // biome-ignore lint/complexity/noThisInStatic: This case we need `this` to encapsulate the element version
  static define(name: string, eleConstructor = this, options: ElementDefinitionOptions = {}) {
    const curConstructor = customElements.get(name) as CustomElementConstructor | MelyElement;
    if (!curConstructor) {
      customElements.define(name, eleConstructor, options);
      return;
    }

    let newVersion = " (unknown version)";
    let existingVersion = newVersion;

    if ("version" in eleConstructor && eleConstructor.version) {
      newVersion = ` v${eleConstructor.version}`;
    }

    if ("version" in curConstructor && curConstructor.version) {
      existingVersion = ` v${curConstructor.version}`;
    }

    // Need to make sure we're not working with null or empty strings before doing version comparisons.
    if (newVersion && existingVersion && newVersion === existingVersion) {
      // If versions match, we don't need to warn anyone. Carry on.
      return;
    }

    console.warn(
      `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`,
    );
  }

  @property({ attribute: "override-css", reflect: true })
  overrideCss?: CSSResultGroup;

  emit(name: string, options?: Event) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options,
    });

    this.dispatchEvent(event);

    return event;
  }

  constructor() {
    super();
    const _constructor = this.constructor as typeof MelyElement;
    const entriesDeps = Object.entries(_constructor.dependencies);
    for (const [name, dependency] of entriesDeps) {
      _constructor.define(name, dependency);
    }
  }
}
