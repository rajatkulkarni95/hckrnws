import { prettyTime } from "~/helpers/time";

import { Fragment, MouseEventHandler } from "react";
import { ClockIcon, CommentIcon, UpvoteIcon } from "~/icons";

type Props = {
  points: number;
  comments: number;
  time: number;
  id?: number;
  user: string;
  url: string;
  isDetailedView?: boolean;
};

const Meta: React.FC<Props> = ({
  points,
  comments,
  time,
  id,
  user,
  url,
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
    </div>
  );
};

export default Meta;
