import type { FC } from "react";
import Link from "#root/shared/components/Link";

type Props = {
  id: string;
  isPublish: boolean;
  link?: string;
  title: string;
  description: string;
  /**
   * Can be a link of image, gift or video
   */
  assetLink: string;
  actionText?: string;
  createdAt: string;
};

const CardCraft: FC<Props> = (props) => {
  return (
    <li data-testid={`p-item-${props.id}`}>
      {props.isPublish ? <PublicCraft {...props} /> : <PrivateCraft {...props} />}
    </li>
  );
};

const PublicCraft: FC<Props> = ({
  id,
  title,
  description,
  link,
  actionText,
  assetLink,
  createdAt,
}) => {
  return (
    <Link href={assetLink} aria-label={title}>
      Public
    </Link>
  );
};

const PrivateCraft: FC<Props> = ({
  title,
  description,
  link,
  actionText,
  assetLink,
  createdAt,
}) => {
  return <div aria-label={title}>Private</div>;
};

export default CardCraft;
