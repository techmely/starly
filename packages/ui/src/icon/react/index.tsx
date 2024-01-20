import type React from "react";

type Props = {
  id: string;
};

const LocalIcon: React.FC<Props> = (props) => {
  return (
    <svg role="img" aria-label="X">
      <use />
    </svg>
  );
};

export default LocalIcon;
