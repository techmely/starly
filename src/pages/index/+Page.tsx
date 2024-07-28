import * as t from "$paraglide/messages.js";
import type { FC } from "react";
import { Movies } from "./Movie";

type Props = {
  locale: string;
};

const IndexPage: FC<Props> = (props) => {
  return (
    <div>
      Index Page
      <h1>{t.seoTitle()}</h1>
      <Movies />
    </div>
  );
};

export default IndexPage;
