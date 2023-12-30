import {
  type LinkRel,
  type LinkTarget,
  MelyElement,
  type MelyFormControl,
  validValidityState,
} from "@techmely/ui-core";
import TIcon from "@techmely/ui-icon";
import { property, query, state } from "lit/decorators.js";
export class TButton extends MelyElement implements MelyFormControl {
  defaultValue?: unknown;
  defaultChecked?: boolean | undefined;
  pattern?: string | undefined;
  min?: string | number | Date | undefined;
  max?: string | number | Date | undefined;
  step?: number | "any" | undefined;
  required?: boolean | undefined;
  minlength?: number | undefined;
  maxlength?: number | undefined;
  checkValidity: () => boolean;
  getForm: () => HTMLFormElement | undefined;
  reportValidity: () => boolean;
  static override dependencies = {
    "t-icon": TIcon,
  };

  @state() _hasFocus = false;
  @state() invalid = false;

  @property() override title = "";
  @property({ reflect: true }) disabled = false;
  @property({ reflect: true }) loading = false;

  /**
   * @default "button"
   * @description The type of button, default value is button, which is opposite of how native `<button>` elements behave
   */
  @property() type: "button" | "submit" | "reset" = "button";

  /**
   * @description The name of the button, submitted as part of a form(only when type is submit)
   * This attribute will ignored when `href` is set
   * @default ""
   */
  @property() name = "";

  /**
   * @description The value of the button, submitted as part of a form(only when type is submit)
   * This attribute will ignored when `href` is set
   * @default ""
   */
  @property() value = "";

  /**
   * @description When set, the button will be rendered as a link with href attribute
   * @default ""
   */
  @property() href = "";

  /**
   * @description Only valid when `href` is set, specifies where to open the linked document
   */
  @property() target?: LinkTarget;

  /**
   * @description When using `href`, this attribute will map to the underlying link's `rel` attribute.
   * Unlike regular links, the default is `noreferrer noopener` to prevent security exploits.
   * However, if you're using `target` to point to a specific tab/window, this will prevent that
   * from working correctly. You can remove or change the default value by setting the attribute
   * to an empty string or a value of your choice, respectively.
   * @default `noreferrer noopener`
   */
  @property() rel: LinkRel = "noreferrer noopener";

  /**
   * @description When using `href`, this attribute will map to the underlying link's `download` attribute.
   */
  @property() download?: string;

  /**
   * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
   * value of this attribute must be an id of a form in the same document or shadow root as the button.
   */
  @property() form?: string;

  /**
   * @description Used to override the form owner's `action` attribute.
   * */
  @property({ attribute: "formaction" }) formAction?: string;

  /**
   * Used to override the form owner's `enctype` attribute.
   * */
  @property({ attribute: "formenctype" })
  formEnctype?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

  /**
   * Used to override the form owner's `method` attribute.
   * */
  @property({ attribute: "formmethod" }) formMethod?: "post" | "get";

  /**
   * Used to override the form owner's `novalidate` attribute.
   * */
  @property({ attribute: "formnovalidate" }) formNoValidate?: boolean;

  /**
   * Used to override the form owner's `target` attribute.
   * */
  @property({ attribute: "formtarget" }) formTarget?: LinkTarget | (string & Record<never, never>);

  @query(".button") button: HTMLButtonElement | HTMLLinkElement;

  #isButton() {
    return !!this.href;
  }

  // #formControlController = new Form();

  get validity() {
    if (this.#isButton()) {
      return (this.button as HTMLButtonElement).validity;
    }
    return validValidityState;
  }

  // get checkValidity() {
  //   if (this.#isButton()) {
  //     return (this.button as HTMLButtonElement).checkValidity();
  //   }
  //   return true;
  // }

  get validationMessage() {
    if (this.#isButton()) {
      return (this.button as HTMLButtonElement).validationMessage;
    }

    return "";
  }

  // get getForm() {
  //   // return this.
  // }

  // get reportValidity() {
  //   if (this.#isButton()) {
  //     return (this.button as HTMLButtonElement).reportValidity();
  //   }

  //   return true;
  // }

  setCustomValidity(message: string) {
    (this.button as HTMLButtonElement).setCustomValidity(message);
  }
}
