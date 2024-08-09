import * as t from "$paraglide/messages.js";
import NewReadingExperiences from "./NewReadingExperiences";
import Portfolio from "./Portfolio";
import ReputationGame from "./ReputationGame";

export default function HomeHero() {
  return (
    <>
      <section className="hero starly-container relative pt-24 md:pt-40 z-[10] is-visible">
        <div className="mx-auto text-center">
          <h1 className="~text-3xl/6xl font-semibold text-center">
            <span>{t.homeTitle1()}</span>
            <br />
            <span>{t.homeTitle2()}</span>
          </h1>
          <div className="flex justify-center">
            <p className="mt-6 ~text-lg/xl font-medium ~max-w-[24rem]/[30rem] text-gray-600">
              {t.homeDescription()}
            </p>
          </div>
          <div className="space-x-4">
            <a
              href="/how-it-works"
              className="mt-8 ~text-lg/xl font-medium bg-blue-600 hover:bg-blue-800 text-white py-3 px-6 rounded-full inline-block"
            >
              {t.homeHowItWorks()}
            </a>
            <a
              href="/products/tours"
              className="mt-8 ~text-lg/xl font-medium inner-border inner-border-slate-400 hover:bg-primary-100 text-gray-700 py-3 px-6 rounded-full inline-block"
            >
              {t.homeWatchIntro()}
            </a>
          </div>
        </div>
      </section>
      <section className="main-features">
        <Portfolio />
        <ReputationGame />
        <NewReadingExperiences />
      </section>
    </>
  );
}
