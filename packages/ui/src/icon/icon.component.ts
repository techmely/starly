import { isEmpty } from "@techmely/utils";
import { watch } from "fs-extra";
import { type HTMLTemplateResult, css, html } from "lit";
import { property, state } from "lit/decorators";
import { isTemplateResult } from "lit/directive-helpers";
import { EVENT_ERROR, EVENT_LOAD, MelyElement } from "../core";
import type { IconLibrary } from "./icon.types";
import { addWatchedIconLib, getIconLib, removeWatchedIconLib } from "./icon.utils";

const CACHEABLE_ERROR = Symbol();
const RETRYABLE_ERROR = Symbol();
let parser: DOMParser;

type SVGResult =
  | HTMLTemplateResult
  | SVGSVGElement
  | typeof RETRYABLE_ERROR
  | typeof CACHEABLE_ERROR;

const iconCache = new Map<string, Promise<SVGResult>>();

/**
 * @tag t-icon
 * @tagname t-icon
 *
 * Here it like this:
 * ```html
 * <t-icon library="system" name="close"></t-icon>
 * <t-icon library="our-icon-system" name="close"></t-icon>
 * <t-icon src="https://some-icon.com/images/icon.svg"></t-icon>
 * ```
 *
 * @attribute {string} name - The name of the icon to display.
 * @attribute {string} src - External URL of an SVG file.
 * @attribute {string} label - An label to use for accessibility(assistive devices). If omitted, the name or src will be used to generate it.
 * @attribute {string} library - The name of the icon library to use. The name should be registered using the `registerIconLibrary` function.
 *
 * @csspart svg - The svg element
 *
 * @reference Shoelace: https://shoelace.style/components/icon
 */
export class TIcon extends MelyElement {
  #initRender = false;
  static override styles = css`
    :host {
      display: inline-block;
    }`;

  @state() _svg?: SVGElement | HTMLTemplateResult;

  /**
   * The name of the icon to display.
   */
  @property({ reflect: true }) name?: string;

  /**
   * External URL of an SVG file.
   * Note: You should be sure you trust the content you're including, as unsanitized content can lead to XSS attacks.
   */
  @property() src?: string;

  /**
   * An label to use for accessibility(assistive devices). If omitted, the name or src will be used to generate it.
   * */
  @property() label = "";

  /**
   * @description The name of the icon library to use. The name should be registered using the `registerIconLibrary` function.
   */
  @property() library?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    addWatchedIconLib(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    removeWatchedIconLib(this);
  }

  protected override firstUpdated(): void {
    this.#initRender = true;
    this.setIcon();
  }

  @watch("label")
  handleLabelChange() {
    this.setAttribute("role", "img");
    // Add a default aria-label for accessibility
    if (isEmpty(this.label) && this.name && this.library) {
      this.setAttribute("aria-label", `${this.library}-${this.name}`);
      this.removeAttribute("aria-hidden");
    } else {
      this.setAttribute("aria-label", this.label);
      this.setAttribute("aria-hidden", "true");
    }
  }

  @watch(["name", "src", "library"])
  async setIcon() {
    const lib = getIconLib(this.library);
    const url = this.#getLibUrl();
    if (!url) {
      this._svg = undefined;
      return;
    }

    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.#resolveIcon(url, lib);
      iconCache.set(url, iconResolver);
    }

    // if haven't rendered yet -> exit early
    if (!this.#initRender) return;

    const svg = await iconResolver;

    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }

    if (url !== this.#getLibUrl()) {
      // If the url has changed while fetching the icon, ignore this request
      return;
    }

    if (isTemplateResult(svg)) {
      this._svg = svg;
      return;
    }

    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this._svg = undefined;
        this.emit(EVENT_ERROR);
        break;
      default:
        this._svg = svg.cloneNode(true) as SVGElement;
        await lib?.mutator?.(this._svg);
        this.emit(EVENT_LOAD);
        break;
    }
  }

  async #resolveIcon(url: string, library?: IconLibrary) {
    let fileData: Response;

    if (library?.useSvgSprites) {
      return html`<svg part="svg"><use part="use" href="${url}"></use></svg>`;
    }

    try {
      fileData = await fetch(url);
      if (!fileData.ok) {
        console.error(`Failed to fetch icon from ${url}: received status code ${fileData.status}`);
        return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      }
    } catch (error) {
      console.error(`Network error while fetching icon from ${url}: ${error?.message}`);
      return RETRYABLE_ERROR;
    }

    try {
      const div = document.createElement("div");
      const iconString = await fileData.text();
      div.innerHTML = iconString;
      const svg = div.firstElementChild as SVGSVGElement | null;
      if (svg?.tagName?.toLowerCase() !== "svg") return CACHEABLE_ERROR;
      if (!parser) parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");

      const svgEl = doc.body.querySelector("svg");
      if (!svgEl) return CACHEABLE_ERROR;

      svgEl.setAttribute("part", "svg");
      return document.adoptNode(svgEl);
    } catch {
      console.error(`Error parsing SVG data from ${url}`);
      return CACHEABLE_ERROR;
    }
  }

  #getLibUrl() {
    const lib = getIconLib(this.library);
    if (this.name && lib) {
      return lib.resolver(this.name);
    }
    return this.src;
  }

  override render() {
    return html`
      ${this.overrideCss ? html`<style>${this.overrideCss}</style>` : ""}
      ${this._svg}
    `;
  }
}
