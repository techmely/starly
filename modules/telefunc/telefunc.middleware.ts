import { type H3Event, setResponseHeaders, setResponseStatus, toWebRequest } from "h3";
import { telefunc } from "telefunc";

export default async function telefuncMiddleware(event: H3Event) {
  const request = toWebRequest(event);
  const httpResponse = await telefunc({
    url: request.url.toString(),
    method: request.method,
    body: await request.text(),
    context: event,
  });
  const { body, statusCode, contentType } = httpResponse;

  setResponseStatus(event, statusCode);
  setResponseHeaders(event, { "content-type": contentType });

  return body;
}
