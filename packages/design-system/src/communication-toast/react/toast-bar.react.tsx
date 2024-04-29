import type React from "react";
import type { Toast, ToastPosition } from "./toast.react.types";

type Props = {
  toast: Toast;
  position: ToastPosition;
};

export const ToastBar: React.FC<Props> = (props) => {
  return <div>Toast bar</div>;
};
