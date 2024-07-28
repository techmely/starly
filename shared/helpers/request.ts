import { parseCookie } from "@techmely/es-toolkit";
import { generatePrefixId } from "@techmely/es-toolkit/id";
import http from "@techmely/http";

const request = http.create({
  // baseUrl: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (req, options) => {
        const cookies = parseCookie(document.cookie);
        if (cookies.token) {
          req.headers.set("Authorization", `Bearer ${cookies.token}`);
        } else {
          req.headers.set("X-Guest-ID", generatePrefixId("guest"));
        }
        req.headers.set("X-App-Version", generatePrefixId("request"));
        // options.headers["Authorization"] = `Bearer ${token}`;
        return req;
      },
    ],
  },
});

export default request;
