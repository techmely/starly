import clsx from "clsx";
import type { FC } from "react";

type Props = {
  title: string;
  avatar: string;
  className?: string;
};

const ProLabel: FC<Props> = ({ avatar, title, className }) => {
  return (
    <div
      className={clsx("flex items-center justify-center gap-4 px-2.5 py-1 rounded-3xl", className)}
    >
      <div className="w-8 h-8 rounded-full">
        <img src={avatar} loading="lazy" alt={`avatar ${title}`} />
      </div>
      <p className="~text-sm/base font-medium">{title}</p>
    </div>
  );
};

export default ProLabel;
