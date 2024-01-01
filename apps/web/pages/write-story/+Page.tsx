import { usePageContext } from "@techmely/vike-react/usePageContext";
import React from "react";

type Props = {
  locale: string;
};

const WriteStory: React.FC<Props> = (props) => {
  const pageContext = usePageContext();
  return <div>Index Page</div>;
};

export default WriteStory;
