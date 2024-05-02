import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import type { ElementColor, ElementEmphasis, ElementSize, ElementVariant } from "../core";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ElementVariant;
  emphasis: ElementEmphasis;
  color: ElementColor;
  size: ElementSize;
  asChild?: boolean;
}

const buttonClasses = {
  variant: {
    filled: "bg-primary text-primary-foreground hover:bg-primary/90",
    outlined: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    text: "",
    elevated: "",
    link: "text-primary underline-offset-4 hover:underline",
  } as Record<ElementVariant, string>,
  color: {
    destructive: "",
    info: "",
    primary: "",
    secondary: "",
    success: "",
    warning: "",
  } as Record<ElementColor, string>,
  size: {
    small: "py-4.5 px-3 rounded-md",
    medium: "py-5 px-8 rounded-md",
    large: "h-5 w-10",
    free: "",
  } as Record<ElementSize, string>,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "filled",
      emphasis = "medium",
      size = "medium",
      color = "primary",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={clsx(
          buttonClasses.variant[variant],
          buttonClasses.size[size],
          buttonClasses.color[color],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "TmlButton";

export { Button };
