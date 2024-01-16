import { useCallback, useEffect } from "react";
import { toast } from "./toast.react";
import { ActionType, dispatch, useStore } from "./toast.react.store";
import type { DefaultToastOptions, Toast, ToastPosition } from "./toast.react.types";

const updateHeight = (toastId: string, height: number) => {
  dispatch({
    type: ActionType.UPDATE_TOAST,
    toast: { id: toastId, height },
  });
};

const startPause = () => {
  dispatch({
    type: ActionType.START_PAUSE,
    time: Date.now(),
  });
};

export const useToaster = (toastOptions?: DefaultToastOptions) => {
  const { toasts, pausedAt } = useStore(toastOptions);

  useEffect(() => {
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    const timeouts = toasts.map((t) => {
      if (t.duration === Number.POSITIVE_INFINITY) {
        return;
      }

      const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          toast.dismiss(t.id);
        }
        return;
      }
      return setTimeout(() => toast.dismiss(t.id), durationLeft);
    });

    return () => {
      for (const to of timeouts) {
        if (to) clearTimeout(to);
      }
    };
  }, [toasts, pausedAt]);

  const endPause = useCallback(() => {
    if (pausedAt) {
      dispatch({ type: ActionType.END_PAUSE, time: Date.now() });
    }
  }, [pausedAt]);

  const calculateOffset = useCallback(
    (
      toast: Toast,
      opts?: {
        reverseOrder?: boolean;
        gutter?: number;
        defaultPosition?: ToastPosition;
      },
    ) => {
      const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {};

      const relevantToasts = toasts.filter(
        (t) => (t.position || defaultPosition) === (toast.position || defaultPosition) && t.height,
      );
      const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id);
      const toastsBefore = relevantToasts.filter(
        (toast, i) => i < toastIndex && toast.visible,
      ).length;

      const offset = relevantToasts
        .filter((t) => t.visible)
        .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
        .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

      return offset;
    },
    [toasts],
  );

  return {
    toasts,
    handlers: {
      updateHeight,
      startPause,
      endPause,
      calculateOffset,
    },
  };
};
