import "./assets/home.scss";
import HomeHero from "#root/pages/index/components/HomeHero";
import HomeBuildFor from "./components/HomeBuildFor";
import HomeProblems from "./components/HomeProblems";
import HomeTestimonals from "./components/HomeTestimonials";

const IndexPage = () => {
  return (
    <>
      <div className="bg-home-hero space-y-8">
        <HomeHero />
        <HomeProblems />
        <HomeBuildFor />
      </div>
      <HomeTestimonals />
    </>
  );
};

export default IndexPage;
