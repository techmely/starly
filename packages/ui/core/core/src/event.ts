export const EVENT_INVALID = "t-invalid";
export const EVENT_ERROR = "t-error";
export const EVENT_LOAD = "t-load";

export const EVENT_FOCUS = "t-focus";
export const EVENT_BLUR = "t-blur";

type BaseEvent = CustomEvent<Record<PropertyKey, never>>;

export type TAfterCollapseEvent = BaseEvent;
export type TAfterExpandEvent = BaseEvent;
export type TAfterHideEvent = BaseEvent;
export type TAfterShowEvent = BaseEvent;
export type TBlurEvent = BaseEvent;
export type TCancelEvent = BaseEvent;
export type TChangeEvent = BaseEvent;
export type TClearEvent = BaseEvent;
export type TCloseEvent = BaseEvent;
export type TCollapseEvent = BaseEvent;
export type TCopyEvent = CustomEvent<{ value: string }>;
export type TErrorEvent = CustomEvent<{ status?: number }>;
export type TExpandEvent = BaseEvent;
export type TFinishEvent = BaseEvent;
export type TFocusEvent = BaseEvent;
export type THideEvent = BaseEvent;
export type THoverEvent = CustomEvent<{
  phase: "start" | "move" | "end";
  value: number;
}>;
export type TInitialFocusEvent = BaseEvent;
export type TInputEvent = BaseEvent;
export type TInvalidEvent = BaseEvent;
export type TLazyChangeEvent = BaseEvent;
export type TLazyLoadEvent = BaseEvent;
export type TLoadEvent = BaseEvent;
export type TMutationEvent = CustomEvent<{ mutationList: MutationRecord[] }>;
export type TRemoveEvent = BaseEvent;
export type TRepositionEvent = BaseEvent;
export type TRequestCloseEvent = CustomEvent<{ source: "close-button" | "keyboard" | "overlay" }>;
export type TResizeEvent = CustomEvent<{ entries: ResizeObserverEntry[] }>;
export type TSelectEvent<T = any> = CustomEvent<{ item: T }>;
export type TShowEvent = BaseEvent;
export type TSlideChangeEvent<T = any> = CustomEvent<{ index: number; slide: T }>;
export type TStartEvent = BaseEvent;
export type TTabHideEvent = CustomEvent<{ name: string }>;
export type TTabShowEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    "t-after-collapse": TAfterCollapseEvent;
    "t-after-expand": TAfterExpandEvent;
    "t-after-hide": TAfterHideEvent;
    "t-after-show": TAfterShowEvent;
    "t-blur": TBlurEvent;
    "t-cancel": TCancelEvent;
    "t-change": TChangeEvent;
    "t-clear": TClearEvent;
    "t-close": TCloseEvent;
    "t-collapse": TCollapseEvent;
    "t-copy": TCopyEvent;
    "t-error": TErrorEvent;
    "t-expand": TExpandEvent;
    "t-finish": TFinishEvent;
    "t-focus": TFocusEvent;
    "t-hide": THideEvent;
    "t-hover": THoverEvent;
    "t-initial-focus": TInitialFocusEvent;
    "t-input": TInputEvent;
    "t-invalid": TInvalidEvent;
    "t-lazy-change": TLazyChangeEvent;
    "t-lazy-load": TLazyLoadEvent;
    "t-load": TLoadEvent;
    "t-mutation": TMutationEvent;
    "t-remove": TRemoveEvent;
    "t-reposition": TRepositionEvent;
    "t-request-close": TRequestCloseEvent;
    "t-resize": TResizeEvent;
    "t-show": TShowEvent;
    "t-select": TSelectEvent;
    "t-slide-change": TSlideChangeEvent;
    "t-start": TStartEvent;
    "t-tab-hide": TTabHideEvent;
    "t-tab-show": TTabShowEvent;
  }
}
