import type { FC } from "react";
import PortfolioCreative from "./PortfolioCreative";
import TabSwitchPortfolio from "./TabSwitchPortfolio";

const Portfolio: FC = (props) => {
  return (
    <div className="cp border border-blue-300 shadow rounded-md p-4 mx-auto w-full h-full">
      <h3>Portfolio</h3>
      <TabSwitchPortfolio />
      <PortfolioCreative />
    </div>
  );
};

export default Portfolio;
