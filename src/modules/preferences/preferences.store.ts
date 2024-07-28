import type { PreferencesState } from "./preferences.types";

export const PREFERENCES_KEY = "tml-preferences";
export const initialPreferencesState: PreferencesState = {
  theme: "techmely",
  colorMode: "auto",
  language: "vi",
};
