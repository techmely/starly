import { generateId } from "@techmely/utils/id";
import type { ReactNode } from "react";
import { ActionType, dispatch } from "./toast.react.store";
import {
  type DefaultToastOptions,
  type Toast,
  type ToastOptions,
  type ToastType,
  type ValueOrFunction,
  resolveValue,
} from "./toast.react.types";

type Message = ValueOrFunction<ReactNode, Toast>;

type ToastHandler = (message: Message, options?: ToastOptions) => string;

const createToast = (message: Message, type: ToastType = "blank", opts?: ToastOptions): Toast => ({
  createdAt: Date.now(),
  visible: true,
  type,
  ariaProps: {
    role: "status",
    "aria-live": "polite",
  },
  message,
  pauseDuration: 0,
  ...opts,
  id: opts?.id || generateId(),
});

const createHandler =
  (type?: ToastType): ToastHandler =>
  (message, options) => {
    const toast = createToast(message, type, options);
    dispatch({ type: ActionType.UPSERT_TOAST, toast });
    return toast.id;
  };

const toast = (message: Message, opts?: ToastOptions) => createHandler("blank")(message, opts);

toast.error = createHandler("error");
toast.success = createHandler("success");
toast.loading = createHandler("loading");
toast.custom = createHandler("custom");

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: ActionType.DISMISS_TOAST,
    toastId,
  });
};

toast.remove = (toastId?: string) => dispatch({ type: ActionType.REMOVE_TOAST, toastId });

toast.promise = <T>(
  promise: Promise<T>,
  msgs: {
    loading: ReactNode;
    success: ValueOrFunction<ReactNode, T>;
    error: ValueOrFunction<ReactNode, any>;
  },
  opts?: DefaultToastOptions,
) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), {
        id,
        ...opts,
        ...opts?.success,
      });
      return p;
    })
    .catch((e) => {
      toast.error(resolveValue(msgs.error, e), {
        id,
        ...opts,
        ...opts?.error,
      });
    });

  return promise;
};

export { toast };
