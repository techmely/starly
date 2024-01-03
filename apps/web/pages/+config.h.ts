import VikeReactQuery from "@techmely/vike-react-query/+config.h";
import VikeReact from "@techmely/vike-react/+config.h";
import type { Config } from "vike/types";

export default ({
  extends: [VikeReact, VikeReactQuery],
} satisfies Config);
