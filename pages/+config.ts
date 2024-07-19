import VikeReact from "@techmely/vike-react/config";
import VikeReactQuery from "@techmely/vike-react/query/config";
import type { Config } from "vike/types";
import AppWrapper from "./AppWrapper";

const config: Config = {
  AppWrapper,
  stream: true,
  extends: [VikeReact, VikeReactQuery],
};

export default config;
