import type { ReactiveControllerHost } from "lit";
import type { MelyElement } from "./custom-element";

export interface MelyFormControl extends MelyElement {
  // Form attributes
  name: string;
  value: unknown;
  disabled?: boolean;
  defaultValue?: unknown;
  defaultChecked?: boolean;
  form?: string;

  // Constraint validation attributes
  pattern?: string;
  min?: number | string | Date;
  max?: number | string | Date;
  step?: number | "any";
  required?: boolean;
  minlength?: number;
  maxlength?: number;

  // Form validation properties
  readonly validity: ValidityState;
  readonly validationMessage: string;

  // Form validation methods
  checkValidity: () => boolean;
  getForm: () => HTMLFormElement | undefined;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
}

export interface FormControlOptions {
  /** A function that returns the form containing the form control. */
  form: (input: MelyFormControl) => HTMLFormElement | null;
  /** A function that returns the form control's name, which will be submitted with the form data. */
  name: (input: MelyFormControl) => string;
  /** A function that returns the form control's current value. */
  value: (input: MelyFormControl) => unknown | unknown[];
  /** A function that returns the form control's default value. */
  defaultValue: (input: MelyFormControl) => unknown | unknown[];
  /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
  disabled: (input: MelyFormControl) => boolean;
  /**
   * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
   * prevent submission and trigger the browser's constraint violation warning.
   */
  reportValidity: (input: MelyFormControl) => boolean;
  /** A function that sets the form control's value */
  setValue: (input: MelyFormControl, value: unknown) => void;
  /**
   * An array of event names to listen to. When all events in the list are emitted, the control will receive validity
   * states such as user-valid and user-invalid.user interacted validity states. */
  assumeInteractionOn: string[];
}

export type FormControlControllerHost = MelyFormControl & ReactiveControllerHost;

export type ElementSize = "small" | "medium" | "large" | "free";
/**
 * High - For the primary, most important, or most common action on a screen: Filled, FAB Button
 * Medium - For important actions that don’t distract from other onscreen elements: Filled Tonal, Elevated, Outlined Button
 * Low - For optional or supplementary actions with the least amount of prominence: Text, Icon, Segmented Button
 */
export type ElementEmphasis = "low" | "medium" | "high";
export type ElementVariant = "outlined" | "filled" | "text" | "circle" | "ghost" | "elevated";
export type ElementColor = "primary" | "secondary" | "destructive" | "warning" | "info" | "success";
export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";
export type LinkRel =
  | "alternate"
  | "author"
  | "bookmark"
  | "external"
  | "help"
  | "license"
  | "next"
  | "nofollow"
  | "noreferrer"
  | "noopener"
  | "prev"
  | "search"
  | "tag"
  | (string & Record<never, never>);
