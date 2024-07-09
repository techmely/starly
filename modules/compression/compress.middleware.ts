import { CompressionStream } from "node:stream/web";
import { type H3Event, getRequestHeader, send, setResponseHeader } from "h3";

export function compressMiddleware(
  event: H3Event,
  response: {
    body?: unknown;
  },
) {
  if (typeof response.body !== "string") {
    return;
  }
  const stream = new Response(response.body).body as ReadableStream;
  const acceptsGzip = getRequestHeader(event, "accept-encoding")?.includes("br");
  if (acceptsGzip) {
    setResponseHeader(event, "Content-Encoding", "gzip");
    response.body = stream.pipeThrough(new CompressionStream("gzip"));
  } else {
    response.body = stream;
  }
  // const compression = promisify(zlib.brotliCompress);
  // const acceptEncoding = getRequestHeader(event, "accept-encoding")?.includes("br");

  // if (acceptEncoding && typeof response.body === "string") {
  //   setResponseHeader(event, "Content-Encoding", "br");
  //   const buffer = await compression(Buffer.from(response.body));
  //   send(event, buffer);
  // }
}
