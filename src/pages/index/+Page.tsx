import "./index.scss";
import HomeHero from "#root/pages/index/components/HomeHero";
import HomeProblems from "./components/HomeProblems";

const IndexPage = () => {
  return (
    <>
      <div className="bg-home-hero space-y-8">
        <HomeHero />
        <HomeProblems />
      </div>
    </>
  );
};

export default IndexPage;
