import { html } from "lit";
import { beforeEach, describe, expect, it } from "vitest";
import type { TIcon } from "..";
import { registerIconLib } from "../icon.utils";

import { EVENT_ERROR, EVENT_LOAD } from "../../../core";
import { fixture, oneEvent, updateElementCompleted } from "../../../test-utils";
import "../index";

const testLibraryIcons = {
  "test-icon1": `
    <svg id="test-icon1">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  "test-icon2": `
    <svg id="test-icon2">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  "invalid-svg-icon": "<invalid-svg></invalid-svg>",
};

describe("<t-icon>", () => {
  beforeEach(() => {
    registerIconLib("test-library", {
      resolver: (name: string) => {
        // only for testing a bad request
        if (name === ("bad-request" as keyof typeof testLibraryIcons)) {
          return "data:image/svg+xml";
        }

        if (name in testLibraryIcons) {
          return `data:image/svg+xml,${encodeURIComponent(testLibraryIcons[name])}`;
        }
        return "";
      },
      mutator: (svg) => {
        svg.setAttribute("fill", "currentColor");
      },
    });
  });

  describe("With default configuration", () => {
    it("default properties", async () => {
      document.body.innerHTML = "<t-icon></t-icon>";
      const el = await fixture<TIcon>(html`<t-icon></t-icon>`);

      expect(el.name).eq(undefined);
      expect(el.src).eq(undefined);
      expect(el.label).eq("");
      expect(el.library).eq(undefined);
    });

    it("Renders pre-loaded system icons and emits t-load event", async () => {
      const el = await fixture<TIcon>(html`<t-icon library="system"></t-icon>`);
      const listener = oneEvent(el, EVENT_LOAD);
      el.name = "arrow";
      const event = await listener;
      await updateElementCompleted(el);
      expect(el.getAttribute("role")).equal("img");
      expect(el.getAttribute("aria-label")).equal("");
      expect(el.getAttribute("aria-hidden")).equal("true");

      // TIcon watch [name, lib, src] properties and render icon correspondingly
      const svg = el.shadowRoot?.querySelector("svg");
      expect(svg).to.exist;
      expect(svg?.getAttribute("part")).equal("svg");
      expect(event).to.exist;
    });

    it("The svg is rendered when a valid src is provided", async () => {
      const el = await fixture<TIcon>(html`<t-icon></t-icon>`);
      const listener = oneEvent(el, EVENT_LOAD);
      el.src = `data:image/svg+xml,${encodeURIComponent(testLibraryIcons["test-icon1"])}`;
      await listener;
      await updateElementCompleted(el);
      const svg = el.shadowRoot?.querySelector("svg");
      expect(svg).to.exist;
      expect(svg?.getAttribute("part")).equal("svg");
      expect(svg?.id).equal("test-icon1");
    });

    it('Should renders icons from "test-library" library', async () => {
      const el = await fixture<TIcon>(html`<t-icon library="test-library"></t-icon>`);
      const listener = oneEvent(el, EVENT_LOAD);
      el.name = "test-icon1";
      await listener;
      await updateElementCompleted(el);
      const svg = el.shadowRoot?.querySelector("svg");
      expect(svg).to.exist;
      expect(svg?.getAttribute("part")).equal("svg");
      // get from mutator
      expect(svg?.getAttribute("fill")).equal("currentColor");
      expect(svg?.id).equal("test-icon1");
    });

    it('Svg not rendered when "name" do not exist in the registered lib', async () => {
      const el = await fixture<TIcon>(
        html`<t-icon library="test-library" name="this-icon-not-exist"></t-icon>`,
      );
      const svg = el.shadowRoot?.querySelector("svg");
      expect(svg).not.to.exist;
    });

    it("Should emits t-error when there is not a valid svg icon", async () => {
      const el = await fixture<TIcon>(html`<t-icon library="test-library"></t-icon>`);
      const listener = oneEvent(el, EVENT_ERROR);
      el.name = "invalid-svg-icon";
      const event = await listener;
      expect(event).to.exist;
      const svg = el.shadowRoot?.querySelector("svg");
      expect(svg).not.to.exist;
    });
  });
});
