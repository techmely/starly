import { useData } from "@techmely/vike-react/useData";
import { usePageContext } from "@techmely/vike-react/usePageContext";
import React from "react";

type Props = {
  locale: string;
};

const IndexPage: React.FC<Props> = (props) => {
  const pageContext = usePageContext();
  const data = useData();
  return (
    <div>
      Index Page
      {JSON.stringify(data)}
    </div>
  );
};

export default IndexPage;
