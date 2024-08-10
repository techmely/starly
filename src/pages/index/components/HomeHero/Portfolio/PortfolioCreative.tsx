import { useData } from "@techmely/vike-react";
import type { FC } from "react";
import type { HomeData } from "#root/pages/index/+data";

type Props = {};

const PortfolioCreative: FC<Props> = (props) => {
  const { showcases } = useData<HomeData>();

  return (
    <div className="flex gap-2 w-full">
      <ul className="basis-1/3">Hello</ul>
      <ul className="basis-1/3">Hello</ul>
      <ul className="basis-1/3">Hello</ul>
    </div>
  );
};

export default PortfolioCreative;
