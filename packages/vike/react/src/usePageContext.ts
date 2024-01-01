import { useContext } from "react";
import { VikePageContext } from "./renderer/PageContextProvider";

export function usePageContext() {
  const pageContext = useContext(VikePageContext);
  if (!pageContext)
    throw new Error("<PageContextProvider> is needed for being able to use usePageContext()");
  return pageContext;
}
