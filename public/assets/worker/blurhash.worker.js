import { encode } from "blurhash";

addEventListener("message", (event) => {
  const { type, payload } = event.data;
  switch (type) {
    case "BLURHASH_ENCODING": {
      const blurhash = encode(payload.data, payload.width, payload.height, 4, 4);
      postMessage({
        type: "BLURHASH_ENCODED",
        payload: blurhash,
      });
      break;
    }
  }
});
