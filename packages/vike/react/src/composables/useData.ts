import { usePageContext } from "./usePageContext";

export function useData<Data>(): Data {
  const { data } = usePageContext() as any;
  return data;
}
