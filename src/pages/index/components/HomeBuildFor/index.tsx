import * as t from "$paraglide/messages.js";
import type { FC } from "react";
import ProLabel from "./ProLabel";

import HomeCreator from "#root/pages/index/assets/images/Creator.png";
import HomeDesigner from "#root/pages/index/assets/images/Designer.png";
import HomeDeveloper from "#root/pages/index/assets/images/Developer.png";
import HomeManager from "#root/pages/index/assets/images/Manager.png";

type Props = {};

const HomeBuildFor: FC<Props> = (props) => {
  return (
    <section className="build-for-pro">
      <div className="starly-container text-center mb-8">
        <h2 className="~text-2xl/4xl font-semibold">
          {t.homeDesignFor()}
          <span className="text-important">{t.homeTheProfessional()}</span>
        </h2>
      </div>
      <ul className="starly-container relative py-8 h-[210px]">
        <li className="absolute z-[1] top-10 left-32 transform rotate-12">
          <ProLabel title={t.homeDeveloper()} avatar={HomeDeveloper} className="bg-blue-100" />
        </li>
        <li className="absolute z-0 top-20 left-60 bg-[#7D7D7D] py-3 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeDeveloperBenif()}</p>
        </li>
        <li className="absolute top-4 right-8 z-[1] rotate-[15deg] transform-gpu">
          <ProLabel title={t.homeManager()} avatar={HomeManager} className="bg-red-100" />
        </li>
        <li className="absolute top-10 right-32 bg-[#7D7D7D] py-3 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeManagerBenif()}</p>
        </li>
        <li className="absolute -bottom-4 left-28 z-[1] rotate-[-10deg] transform-gpu">
          <ProLabel title={t.homeCreator()} avatar={HomeCreator} className="bg-primary-100" />
        </li>
        <li className="absolute -bottom-10 left-48 bg-[#7D7D7D] py-3 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeCreatorBenif()}</p>
        </li>
        <li className="absolute z-[1] bottom-8 right-[28rem] rotate-[10deg] transform-gpu">
          <ProLabel title={t.homeDesigner()} avatar={HomeDesigner} className="bg-purple-100" />
        </li>
        <li className="absolute bottom-4 right-24 bg-[#7D7D7D] py-3 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeDesignerBenif()}</p>
        </li>
      </ul>
    </section>
  );
};

export default HomeBuildFor;
