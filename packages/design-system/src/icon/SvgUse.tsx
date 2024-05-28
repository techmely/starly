import type { FC, SVGAttributes } from "react";

type SvgId =
  | "brand-twitter"
  | "brand-linkedin"
  | "brand-facebook"
  | "brand-telegram"
  | "close-outline"
  | "chevron-right-outline"
  | "chevron-left-outline"
  | "chevron-down-outline"
  | "chevron-up-outline"
  | "arrow-drop-down-rounded"
  | "arrow-drop-up-rounded"
  | "square-rounded"
  | "check-circle-outline"
  // In case you want to pass icon id dynamic
  | (string & {});

export interface SvgUseProps extends SVGAttributes<SVGElement> {
  id: SvgId;
  label?: string;
  className?: string;
  path?: string;
}

export const SvgUse: FC<SvgUseProps> = ({
  id,
  label = "Present Icon",
  className,
  path,
  ...rest
}) => {
  const baseAssetPath = `${path || "/svg/all.svg"}#${id}`;
  return (
    <svg role="img" aria-label={label} className={className} {...rest}>
      <use href={baseAssetPath} />
    </svg>
  );
};
