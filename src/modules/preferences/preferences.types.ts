export type DataTheme = "techmely" | "paradise";
export type DataColorMode = "dark" | "light" | "auto";

export type PreferencesState = {
  language: string;
  theme: DataTheme;
  colorMode: DataColorMode;
};
