import React from "react";
import type { FC } from "react";
import { Movies } from "./Movie";

type Props = {
  locale: string;
};

const IndexPage: FC<Props> = (props) => {
  return (
    <div>
      Index Page
      <Movies />
    </div>
  );
};

export default IndexPage;
