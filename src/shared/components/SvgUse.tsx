import type { FC, SVGAttributes } from "react";
import type { HomeSvgId } from "#root/pages/index/assets/svg/svg.id";

export const SvgUse: FC<SvgUseProps> = ({ role, customPath, id, label, ...rest }) => {
  const svgPath = customPath ? `${customPath}#${id}` : `/svg/common.svg#${id}`;

  return (
    // biome-ignore lint/nursery/useSemanticElements: We don't need to use semantic elements here
    <svg role="img" aria-label={label || `${id} icon`} {...rest}>
      <use href={svgPath} />
    </svg>
  );
};

type SvgId =
  | HomeSvgId
  | "brand-twitter"
  | "brand-linkedin"
  | "brand-facebook"
  | "brand-telegram"
  | "brand-zalo"
  | "brand-facebook"
  | "brand-telegram"
  | "outline-clock"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "chevron-up"
  | "close-outline"
  | "facebook"
  | "google"
  | "github"
  // In case you want to pass icon id dynamic
  | (string & {});

interface SvgUseProps extends SVGAttributes<SVGElement> {
  id: SvgId;
  label?: string;
  customPath?: string;
}
