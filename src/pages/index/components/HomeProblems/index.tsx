import * as t from "$paraglide/messages.js";
import type { FC } from "react";

type Props = {};

const problems = [
  {
    title: t.homeTitlePb1(),
    description: t.homePb1(),
  },
  {
    title: t.homeTitlePb2(),
    description: t.homePb2(),
  },
  {
    title: t.homeTitlePb3(),
    description: t.homePb3(),
  },
  {
    title: t.homeTitlePb4(),
    description: t.homePb4(),
  },
  {
    title: t.homeTitlePb5(),
    description: t.homePb5(),
  },
  {
    title: t.homeTitlePb6(),
    description: t.homePb6(),
  },
  {
    title: t.homeTitlePb7(),
    description: t.homePb7(),
  },
  {
    title: t.homeTitlePb8(),
    description: t.homePb8(),
  },
  {
    title: t.homeTitlePb9(),
    description: t.homePb9(),
  },
  {
    title: t.homeTitlePb10(),
    description: t.homePb10(),
  },
  {
    title: t.homeTitlePb11(),
    description: t.homePb11(),
  },
  {
    title: t.homeTitlePb12(),
    description: t.homePb12(),
  },
];

const HomeProblems: FC<Props> = (props) => {
  return (
    <section className="home-problems my-8">
      <div className="starly-container text-center mb-8">
        <h2 className="~text-2xl/4xl font-semibold">
          {t.homeBuildPortfolio()}
          <span className="text-important">{t.homeComplicated()}</span>
        </h2>
      </div>
      <ul className="problems grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {problems.map((pb) => (
          <li key={pb.title} className="problems-item">
            <h3 className="~text-base/lg font-semibold">{pb.title}</h3>
            <p className="~text-sm/base">{pb.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeProblems;
