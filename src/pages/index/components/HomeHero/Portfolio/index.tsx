import type { FC } from "react";
import TabSwitchPortfolio from "./TabSwitchPortfolio";

const Portfolio: FC = (props) => {
  return (
    <div className="cp border border-blue-300 shadow rounded-md p-4 mx-auto w-full h-full">
      <h3>Portfolio</h3>
      <TabSwitchPortfolio />
      <div className="animate-pulse flex space-x-4 h-[calc(100%-24px)]">
        <div className="w-full h-full bg-slate-300 rounded" />
      </div>
    </div>
  );
};

export default Portfolio;
