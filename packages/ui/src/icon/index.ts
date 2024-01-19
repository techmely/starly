import { TIcon } from "./icon.component";

export * from "./icon.const";
export * from "./icon.component";
export * from "./icon.types";
export * from "./icon.utils";

export default TIcon;

TIcon.define("t-icon");

declare global {
  interface HTMLElementTagNameMap {
    "t-icon": TIcon;
  }
}
