import React, { type FC, type SVGAttributes } from "react";

export const SvgUse: FC<SvgUseProps> = ({ role, customPath, id, label, ...rest }) => {
  const [svgPath, setSvgPath] = useState(`/svg/common.svg#${id}`);
  useEffect(() => {
    if (customPath) setSvgPath(`${customPath}#${id}`);
  }, [customPath]);

  return (
    <svg role="img" aria-label={label || "Present Icon"} {...rest}>
      <use href={svgPath} />
    </svg>
  );
};

type SvgId =
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
