import { prettyTime } from "~/helpers/time";

import { Fragment, MouseEventHandler } from "react";
import { ClockIcon, CommentIcon, UpvoteIcon, StarIcon } from "~/icons";
import { isHackerNewsLink } from "~/helpers/contains";

type Props = {
  points: number;
  comments: number;
  time: number;
  id?: number;
  user: string;
  url: string;
  isDetailedView?: boolean;
  handleStarring: MouseEventHandler<HTMLButtonElement>;
  isStoryStarred: boolean;
};

const Meta: React.FC<Props> = ({
  points,
  comments,
  time,
  id,
  user,
  url,
  handleStarring,
  isStoryStarred,
  isDetailedView = false,
}) => {
  return (
    <div
      className={`flex justify-between w-full ${
        isDetailedView ? "ml-3" : "mt-1"
      }`}
    >
      <div className="flex items-center">
        <div className="flex items-center mr-2 p-1 pl-0">
          <UpvoteIcon className="h-3 w-3 text-icon" />
          <span className="text-xs ml-1 text-tertiary font-coolSans">
            {points}
          </span>
        </div>
        <div className="flex items-center mr-2 p-1 pl-0">
          <CommentIcon className="h-3 w-3 text-icon" />
          <span className="text-xs ml-1 text-tertiary font-coolSans">
            {comments}
          </span>
        </div>
        <div className="flex items-center mr-2 p-1 pl-0">
          <ClockIcon className="h-3 w-3 text-icon" />
          <span className="text-xs ml-1 text-tertiary font-coolSans">
            {prettyTime(time)}
          </span>
        </div>
      </div>
      <button
        className="flex mr-2 p-1 items-center bg-secondary cursor-pointer rounded border-none hover:bg-hover"
        onClick={handleStarring}
      >
        <StarIcon
          className={`h-3 w-3 ${
            isStoryStarred ? "text-amber-400" : "text-icon"
          }`}
        />
        <span className="text-xs ml-1 text-secondary font-coolSans">
          {isStoryStarred ? "Starred" : "Star"}
        </span>
      </button>
    </div>
  );
};

export default Meta;
