import type { FC } from "react";

const ReputationGame: FC = (props) => {
  return (
    <div className="rg border border-blue-300 shadow rounded-md p-4 w-full h-full mx-auto">
      <h3>Reputation Game</h3>
      <div className="animate-pulse flex space-x-4 h-[calc(100%-24px)]">
        <div className="w-full h-full bg-slate-300 rounded" />
      </div>
    </div>
  );
};

export default ReputationGame;
