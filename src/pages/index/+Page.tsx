import "./assets/home.scss";
import HomeHero from "#root/pages/index/components/HomeHero";
import HomeBuildFor from "./components/HomeBuildFor";
import HomeProblems from "./components/HomeProblems";
import HomeTestimonials from "./components/HomeTestimonials";

const IndexPage = () => {
  return (
    <>
      <div className="bg-home-hero space-y-8 relative">
        <HomeHero />
        <HomeProblems />
        <HomeBuildFor />
      </div>
      <HomeTestimonials />
    </>
  );
};

export default IndexPage;
