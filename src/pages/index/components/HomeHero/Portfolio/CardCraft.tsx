import type { Collaborator, FileModel } from "@techmely/starly-models";
import type { FC } from "react";
import Link from "#root/shared/components/Link";

export type CardCraftProps = {
  id: string;
  isPublish: boolean;
  link?: string;
  title: string;
  description: string;
  /**
   * Can be a link of image, gift or video
   */
  file: Partial<FileModel>;
  actionText?: string;
  createdAt: string;
  authorName?: string;
  collaborators?: Collaborator[];
};

const CardCraft: FC<CardCraftProps> = (props) => {
  return (
    <li data-testid={`p-item-${props.id}`}>
      {props.isPublish ? <PublicCraft {...props} /> : <PrivateCraft {...props} />}
    </li>
  );
};

const PublicCraft: FC<CardCraftProps> = ({
  id,
  title,
  description,
  link,
  actionText,
  file,
  authorName,
  createdAt,
}) => {
  return (
    <Link href={link} aria-label={title}>
      <div className="relative overflow-hidden rounded-lg">
        {/* <img src={file} alt={title} className="relative" /> */}
        <div className="absolute bottom-0 z-[1] w-full flex justify-between items-center">
          <h3>{title}</h3>
          {/* <p>{description}</p> */}
          {authorName ? <p>{authorName}</p> : <time>{createdAt}</time>}
        </div>
      </div>
    </Link>
  );
};

const PrivateCraft: FC<CardCraftProps> = ({
  id,
  title,
  description,
  link,
  actionText,
  file,
  createdAt,
}) => {
  return <div aria-label={title}>Private</div>;
};

export default CardCraft;
