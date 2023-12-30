type GtagOptions = {
  page_path?: URL | string;
  page_location?: URL | string;
  callback?: () => void;
  event_category?: string;
  event_value?: number;
  event_action?: string;
  hit_type?: string;
  non_interaction?: boolean;
  event_label?: string;
  transport?: string;
  debug_mode?: boolean;
};

type AnalyticOptions = {
  eventCategory?: string;
  eventLabel?: string;
  nonInteraction?: boolean;
  value?: number;
  transport?: string;
  hitType?: string;
};

declare global {
  type GtagCommand = "event" | "config" | "send" | "set";
  type GACommand = "event" | "send";

  interface Window {
    gtag(command: GtagCommand, target?: string, options?: GtagOptions | number | string): void;
    gtag(command: GtagCommand, options?: GtagOptions): void;
    ga(command: GACommand, options?: AnalyticOptions): void;
    msMatchMedia(media: string): MediaQueryList;
  }
  // WICG Spec: https://wicg.github.io/ua-client-hints

  type Navigator = NavigatorUA;
  type WorkerNavigator = NavigatorUA;

  // https://wicg.github.io/ua-client-hints/#navigatorua
  interface NavigatorUA {
    readonly userLanguage?: string;
    readonly browserLanguage?: string;
    readonly systemLanguage?: string;
    readonly userAgentData?: NavigatorUAData;
  }
}
// https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

// https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[];
  readonly mobile?: boolean;
  readonly platform?: string;
  readonly architecture?: string;
  readonly bitness?: string;
  readonly model?: string;
  readonly platformVersion?: string;
  readonly uaFullVersion?: string;
}

// https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
  toJSON(): UALowEntropyJSON;
}

export {};
