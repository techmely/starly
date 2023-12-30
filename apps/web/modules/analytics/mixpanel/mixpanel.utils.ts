import { MIX_PANEL_TOKEN } from "./mixpanel.const";

export const initMixPanel = () =>
  mixpanel.init(MIX_PANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });

export const trackUserEvent = (eventName: string, params?: any) => {
  mixpanel.track(eventName, params);
};
