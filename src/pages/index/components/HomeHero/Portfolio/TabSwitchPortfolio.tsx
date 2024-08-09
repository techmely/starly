import * as t from "$paraglide/messages.js";
import { useEffect, useRef, useState } from "react";

export default function TabSwitchPortfolio() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeTabElementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement && container.offsetWidth > 0) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const clipPath = getClipPath(offsetLeft, offsetWidth, container.offsetWidth);
        container.style.clipPath = clipPath;
      }
    }
  }, [activeTab]);

  return (
    <div className="wrapper">
      <ul className="list">
        {TABS.map((tab) => (
          <li key={tab.name}>
            <button
              type="button"
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className={`button ${tab.name.toLocaleLowerCase()}`}
            >
              {tab.icon}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div aria-hidden className="clip-path-container" ref={containerRef}>
        <ul className="list list-overlay">
          {TABS.map((tab) => (
            <li key={tab.name}>
              <button
                type="button"
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className="button-overlay button"
                tabIndex={-1}
              >
                {tab.icon}
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TABS = [
  {
    name: t.homeCreative(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <title>Creative icon</title>
        <path
          fill="currentColor"
          d="m9 4l2.5 5.5L17 12l-5.5 2.5L9 20l-2.5-5.5L1 12l5.5-2.5zm0 4.83L8 11l-2.17 1L8 13l1 2.17L10 13l2.17-1L10 11zM19 9l-1.26-2.74L15 5l2.74-1.25L19 1l1.25 2.75L23 5l-2.75 1.26zm0 14l-1.26-2.74L15 19l2.74-1.25L19 15l1.25 2.75L23 19l-2.75 1.26z"
        />
      </svg>
    ),
  },
  {
    name: t.homeTrust(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <title>Trust icon</title>
        <path
          fill="currentColor"
          d="m17.227 16.67l2.19 6.742l-7.413-5.388zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397l-2.84 8.714l7.422-5.388l4.583-3.326z"
        />
      </svg>
    ),
  },
  {
    name: t.homeCalm(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
        <title>Calm icon</title>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.794c3.906 0 6.035 2.498 8 4.768s4.094 4.768 8 4.768m-8-14.66c3.906 0 6.035 2.499 8 4.768c1.965 2.27 4.094 4.768 8 4.768"
        />
        <circle
          cx="24"
          cy="24"
          r="21.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// customPath="/src/pages/index/assets/svg/index.svg"

function getClipPath(offsetLeft: number, offsetWidth: number, containerWidth: number) {
  const clipLeft = offsetLeft;
  const clipRight = offsetLeft + offsetWidth;
  const left = Number((clipLeft / containerWidth) * 100).toFixed();
  const right = Number(100 - (clipRight / containerWidth) * 100).toFixed();
  return `inset(0 ${right}% 0 ${left}% round 17px)`;
}
