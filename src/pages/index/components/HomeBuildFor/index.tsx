import * as t from "$paraglide/messages.js";
import type { FC } from "react";
import ProLabel from "./ProLabel";

import HomeCreator from "../../assets/images/Creator.png";
import HomeDesigner from "../../assets/images/Designer.png";
import HomeDeveloper from "../../assets/images/Developer.png";
import HomeManager from "../../assets/images/Manager.png";

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
        <li className="absolute z-1 top-8 left-20 transform rotate-12">
          <ProLabel title={t.homeDeveloper()} avatar={HomeDeveloper} className="bg-blue-200" />
        </li>
        <li className="absolute z-0 top-20 left-48 bg-gray-500 py-2 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeDeveloperBenif()}</p>
        </li>
        <li className="absolute top-8 right-20">
          <ProLabel title={t.homeManager()} avatar={HomeManager} className="bg-red-200" />
        </li>
        <li className="absolute top-20 right-24 bg-gray-500 py-2 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeManagerBenif()}</p>
        </li>
        <li className="absolute bottom-0 left-0">
          <ProLabel title={t.homeCreator()} avatar={HomeCreator} className="bg-primary-200" />
        </li>
        <li className="absolute -bottom-10 left-0 bg-gray-500 py-2 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeCreatorBenif()}</p>
        </li>
        <li className="absolute bottom-0 right-0">
          <ProLabel title={t.homeDesigner()} avatar={HomeDesigner} className="bg-purple-200" />
        </li>
        <li className="absolute -bottom-10 right-0 bg-gray-500 py-2 px-4 rounded-3xl">
          <p className="~text-xs/sm text-center text-white">{t.homeDesignerBenif()}</p>
        </li>
      </ul>
    </section>
  );
};

export default HomeBuildFor;
