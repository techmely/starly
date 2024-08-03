import * as t from "$paraglide/messages.js";

export default function HomeHero() {
  return (
    <div className="bg-home-hero">
      <section className="hero relative pt-24 md:pt-40 z-[10] px-5 is-visible">
        <div className="starly-container mx-auto text-center">
          <h1 className="~text-3xl/6xl font-semibold text-center">
            <span>{t.title1()}</span>
            <br />
            <span>{t.title2()}</span>
          </h1>
          <div className="flex justify-center">
            <p className="mt-6 ~text-lg/xl font-medium ~max-w-[24rem]/[30rem] text-gray-600">
              {t.description()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
