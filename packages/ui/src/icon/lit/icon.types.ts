export type IconLibraryResolver = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => Promise<void> | void;

export type IconLibrary = {
  /**
   * @description The name of the icon library.
   */
  name: string;
  /**
   * @description A function that returns the path to the SVG file.
   */
  resolver: IconLibraryResolver;
  /**
   * @description A function that mutates the SVG element before it is rendered.
   * */
  mutator?: IconLibraryMutator;
  /**
   * @description When you want to use <svg><use xlink:href="..."></use></svg> to render the icon.
   * This is useful when you want to use a sprite sheet.
   * @see https://css-tricks.com/svg-sprites-use-better-icon-fonts/
   */
  useSvgSprites?: boolean;
};
