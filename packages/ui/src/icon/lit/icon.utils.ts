import type { TIcon } from "./icon.component";
import { techmelySystemIcons } from "./icon.const";
import type { IconLibrary } from "./icon.types";

const defaultIconLibs: IconLibrary[] = [techmelySystemIcons];
let watchedIcons: TIcon[] = [];

/** Adds an icon to the list of watched icons. */
export function addWatchedIconLib(icon: TIcon) {
  if (!watchedIcons.includes(icon)) {
    watchedIcons.push(icon);
  } else {
    console.warn("Icon already watched");
  }
}

/** Removes an icon from the list of watched icons. */
export function removeWatchedIconLib(icon: TIcon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}

/** Returns a library from the registry. */
export function getIconLib(name?: string) {
  return defaultIconLibs.find((lib) => lib.name === name);
}

/** Adds an icon library to the registry, or overrides an existing one. */
export function registerIconLib(name: string, options: Omit<IconLibrary, "name">) {
  const existingLibraryIndex = defaultIconLibs.findIndex((lib) => lib.name === name);
  if (existingLibraryIndex !== -1) {
    defaultIconLibs.splice(existingLibraryIndex, 1);
  }
  defaultIconLibs.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
    useSvgSprites: options.useSvgSprites,
  });

  // Redraw watched icons
  for (const icon of watchedIcons) {
    if (icon.library === name) {
      icon.setIcon();
    }
  }
}
