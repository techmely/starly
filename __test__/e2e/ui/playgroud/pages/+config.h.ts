import vikeReact from "@techmely/vike-react";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault";

export default ({
  Layout,
  extends: [vikeReact],
} satisfies Config);
