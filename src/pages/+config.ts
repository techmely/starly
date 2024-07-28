import VikeReact from "@techmely/vike-react/config";
import VikeReactQuery from "@techmely/vike-react-query/config";

import type { Config } from "vike/types";
import Wrapper from "./AppWrapper";

const config: Config = {
  Wrapper,
  stream: true,
  metadata: {
    title: "Starly",
    description: "Empower Your Portfolio Fun & Effortlessly",
    canonical: "https://starly.techmely.com",
    siteName: "Starly",
    thumbnail: "https://starly.techmely.com/thumbnail.webp",
    color: {
      supportedColorSchemes: "dark light",
      colorScheme: "dark",
      themeColor: "#00000",
    },
    hint: {
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      acceptCh: "Accept, DPR, Viewport-Width, ECT, Width, Save-Data",
    },
    favicon: {
      appleTouchIcon: "/favicons/apple-touch-icon.png",
      icon: "/favicons/favicon.ico",
      icon16: "/favicons/favicon-16x16.png",
      icon32: "/favicons/favicon-32x32.png",
      manifest: "/favicons/site.webmanifest",
      maskIcon: "/favicons/favicon-32x32.svg",
      msapplicationConfig: "/favicons/browserconfig.xml",
    },
  },
  extends: [VikeReact, VikeReactQuery],
};

export default config;
