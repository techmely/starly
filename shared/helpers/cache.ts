import { type H3Event, setHeader } from "h3";

export function configSWRHeaders(
  event: H3Event,
  // 5 mins
  maxAge = 300,
) {
  setHeader(event, "Cache-Control", `s-maxage=${maxAge}, stale-while-revalidate`);
}
