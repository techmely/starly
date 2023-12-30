// Predefined common validity states. All of them are read-only.

import type { ReactiveController } from "lit";
import { EVENT_INVALID } from "./event";
import type { FormControlControllerHost, FormControlOptions, MelyFormControl } from "./types";

/**
 * @description A validity state object that represents `valid`
 */
export const validValidityState: ValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false,
});

/**
 * @description A validity state object that represents `value missing`
 */
export const valueMissingValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  valueMissing: true,
});

/**
 * @description A validity state object that represents a custom error
 */
export const customErrorValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  customError: true,
});

//
// We store a WeakMap of forms + controls so we can keep references to all Mely UI controls within a given form. As
// elements connect and disconnect to/from the DOM, their containing form is used as the key and the form control is
// added and removed from the form's set, respectively.
//
export const formCollections: WeakMap<HTMLFormElement, Set<MelyFormControl>> = new WeakMap();

//
// We store a WeakMap of reportValidity() overloads so we can override it when form controls connect to the DOM and
// restore the original behavior when they disconnect.
//
const reportValidityOverloads: WeakMap<HTMLFormElement, () => boolean> = new WeakMap();

//
// We store a Set of controls that users have interacted with. This allows us to determine the interaction state
// without littering the DOM with additional data attributes.
//
const userInteractedControls: WeakSet<MelyFormControl> = new WeakSet();

//
// We store a WeakMap of interactions for each form control so we can track when all conditions are met for validation.
//
const interactions = new WeakMap<MelyFormControl, string[]>();

export class FormControlController implements ReactiveController {
  host: FormControlControllerHost;
  form?: HTMLFormElement;
  options: FormControlOptions;

  constructor(host: FormControlControllerHost, options: Partial<FormControlOptions>) {
    host.addController(this as ReactiveController);
    this.host = host;
    this.options = {
      form: (input) => {
        // If there's a form attribute, use it to find the target form by id
        if (input.hasAttribute("form") && input.getAttribute("form") !== "") {
          const root = input.getRootNode() as Document | ShadowRoot;
          const formId = input.getAttribute("form");

          if (formId) {
            return root.getElementById(formId) as HTMLFormElement;
          }
        }

        return input.closest("form");
      },
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => input.disabled ?? false,
      reportValidity: (input) =>
        typeof input.reportValidity === "function" ? input.reportValidity() : true,
      setValue: (input, value) => {
        input.value = value;
      },
      assumeInteractionOn: ["t-input"],
      ...options,
    };
  }

  hostConnected() {
    this.#attachForm();

    interactions.set(this.host, []);
    for (const event of this.options.assumeInteractionOn) {
      this.host.addEventListener(event, this.#handleInteraction);
    }
  }

  hostDisconnected() {
    this.#detachForm();

    // Clean up interactions
    interactions.delete(this.host);
    for (const event of this.options.assumeInteractionOn) {
      this.host.removeEventListener(event, this.#handleInteraction);
    }
  }

  #attachForm() {
    const form = this.options?.form(this.host);
    if (form) {
      this.form = form;
      if (formCollections.has(this.form)) {
        const collection = formCollections.get(this.form);
        collection?.add(this.host);
      } else {
        formCollections.set(this.form, new Set([this.host]));
      }

      this.form?.addEventListener("formdata", this.#handleFormData);
      this.form?.addEventListener("submit", this.#handleFormSubmit);
      this.form?.addEventListener("reset", this.#handleFormReset);

      // Remove the overload and restore the original method
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);

        this.form.reportValidity = () => this.#reportFormValidity();
      }
    } else {
      this.form = undefined;
    }
  }

  #detachForm() {
    if (this.form) {
      // Remove this element from the form's collection
      formCollections.get(this.form)?.delete(this.host);

      this.form.removeEventListener("formdata", this.#handleFormData);
      this.form.removeEventListener("submit", this.#handleFormSubmit);
      this.form.removeEventListener("reset", this.#handleFormReset);

      // Remove the overload and restore the original method
      if (reportValidityOverloads.has(this.form)) {
        const reportValidity = reportValidityOverloads.get(this.form);
        if (reportValidity) {
          this.form.reportValidity = reportValidity;
        }
        reportValidityOverloads.delete(this.form);
      }
    }

    this.form = undefined;
  }

  /**
   * Mely form controls work hard to act like regular form controls. They support the Constraint Validation API
   * and its associated methods such as setCustomValidity() and reportValidity(). However, the HTMLFormElement also
   * has a reportValidity() method that will trigger validation on all child controls. Since we're not yet using
   * ElementInternals, we need to overload this method so it looks for any element with the reportValidity() method.
   * We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
   * validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
   * be necessary once we can use ElementInternals.
   * Note that we're also honoring the form's novalidate attribute.
   */
  #reportFormValidity() {
    if (this.form && !this.form.noValidate) {
      // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
      // elements that support the constraint validation API.
      const elements = Array.from(this.form.querySelectorAll<HTMLInputElement>("*"));

      for (const element of elements) {
        if (typeof element.reportValidity === "function") {
          if (!element.reportValidity()) {
            return false;
          }
        }
      }
    }
    return true;
  }

  #handleFormData(event: FormDataEvent) {
    const isDisabled = this.options?.disabled(this.host);
    const name = this.options?.name(this.host);
    const value = this.options?.value(this.host);
    const isButton = this.host.tagName?.toLowerCase?.() === "t-button";
    const isValidData =
      !isDisabled &&
      !isButton &&
      typeof name === "string" &&
      name.length > 0 &&
      typeof value !== "undefined";

    if (isValidData) {
      if (Array.isArray(value)) {
        for (const v of value) {
          event.formData.append(name, v as any);
        }
      } else {
        event.formData.append(name, value as any);
      }
    }
  }

  #handleFormSubmit(event: Event) {
    const isDisabled = this.options?.disabled(this.host);
    const reportValidity = this.options?.reportValidity(this.host);

    // Update the interacted state for all controls when the form is submitted
    if (this.form && !this.form.noValidate) {
      const form = formCollections.get(this.form);
      if (form) {
        for (const control of form) {
          this.#setUserInteracted(control, true);
        }
      }
    }
    if (this.form && !this.form?.noValidate && !isDisabled && !reportValidity) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  #setUserInteracted(el: MelyFormControl, hasInteracted: boolean) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }

    el.requestUpdate();
  }

  #handleFormReset() {
    this.options?.setValue(this.host, this.options?.defaultValue(this.host));
    this.#setUserInteracted(this.host, false);
    interactions.set(this.host, []);
  }

  #handleInteraction(event: Event) {
    const emittedEvents = interactions.get(this.host) ?? [];

    if (!emittedEvents.includes(event.type)) {
      emittedEvents.push(event.type);
    }

    if (emittedEvents.length === this.options.assumeInteractionOn.length) {
      this.#setUserInteracted(this.host, true);
    }
  }

  /**
   * Return the associated `form` element, if one exist.
   */
  getForm() {
    return this.form;
  }

  setValidity(isValid: boolean) {
    const host = this.host;
    const hasInteracted = userInteractedControls.has(host);
    const required = host.required || false;

    /**
     * Mapping data attributes states for end-user can customize the styles
     */
    host.toggleAttribute("data-required", required);
    host.toggleAttribute("data-optional", !required);
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-invalid", !isValid);
    host.toggleAttribute("data-user-valid", isValid && hasInteracted);
    host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
  }

  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }

  /**
   * Dispatches a non-bubbling, cancelable custom event of type `t-invalid`.
   * If the `t-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `t-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originEvent: Event) {
    const invalidEvent = new CustomEvent(EVENT_INVALID, {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {},
    });

    if (!originEvent) {
      invalidEvent.preventDefault();
    }
    if (!this.host.dispatchEvent(invalidEvent)) {
      originEvent.preventDefault();
    }
  }
}
