import { prettyTime } from "~/helpers/time";
import { Fragment, RefObject, useEffect, useState } from "react";
import { TComment } from "~/types/story";
import { ChevronDownIcon, ChevronUpIcon, ClipboardIcon } from "~/icons";
import { contains } from "~/helpers/contains";
import InnerHTMLText from "~/components/Common/InnerHTMLText";
import { Size } from "~/types/size";
import useWindowSize from "~/hooks/useWindowSize";
import { useHover } from "~/hooks/useHover";

type Props = {
  comment: TComment;
  op: string;
};

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: {
      user,
      content,
      time,
      deleted,
      level,
      comments,
      comments_count,
      id,
    },
    op,
  } = props;
  const isCommenterOP = user === op;
  const [collapsed, setCollapsed] = useState<Boolean>(false);

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  // find quotes and apply styles
  useEffect(() => {
    contains("p", ">", "quotes");
  }, []);

  const size: Size = useWindowSize();
  const isMobile = (size?.width ?? 641) < 640;

  const margin = isMobile ? 8 : 16;

  if (collapsed)
    return (
      <div className="flex" ref={hoverRef}>
        <section
          className={`pt-0 pr-2 pb-1 pl-3 flex flex-col my-2 relative w-full border-l-2 border-primary`}
          style={{ marginLeft: `calc(${margin}px * ${level})` }}
        >
          <div className="flex justify-between">
            <span
              className={`text-xs text-secondary font-mono py-1 px-2 rounded flex items-center ${
                isCommenterOP ? "bg-op" : "bg-secondary"
              }`}
            >
              {user}
            </span>
            <div className="flex items-center">
              {(isHovered || isMobile) && (
                <button
                  className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_VERCEL_URL}/stories/${id}`
                    );
                  }}
                >
                  <ClipboardIcon className="h-3 w-3 text-icon mr-2 group-hover:text-primary" />
                </button>
              )}
              <span className="py-0.5 px-1.5 text-secondary font-mono bg-tertiary rounded text-[10px]">
                {comments_count}
              </span>
              <button
                className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                onClick={() => setCollapsed(false)}
              >
                <ChevronDownIcon className="h-3 w-3 text-icon group-hover:text-primary" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );

  return (
    <Fragment>
      {/* Indent the children based on the level */}
      <div style={{ display: "flex" }} ref={hoverRef}>
        <section
          className={`pt-0 pr-2 pb-1 pl-3 flex flex-col my-2 relative w-full border-l-2  border-primary`}
          style={{ marginLeft: `calc(${margin}px * ${level})` }}
        >
          {!deleted && (
            <div className="flex justify-between mb-2">
              <span
                className={`text-xs text-secondary font-mono py-1 px-2 rounded flex items-center ${
                  isCommenterOP ? "bg-op" : "bg-secondary"
                }`}
              >
                {user}
              </span>
              <div className="flex items-center">
                {(isHovered || isMobile) && (
                  <button
                    className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_VERCEL_URL}/stories/${id}`
                      );
                    }}
                  >
                    <ClipboardIcon className="h-3 w-3 text-icon mr-2 group-hover:text-primary" />
                  </button>
                )}
                <span className="text-secondary font-mono text-[10px]">
                  {prettyTime(time)}
                </span>
                <button
                  className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                  onClick={() => setCollapsed(true)}
                >
                  <ChevronUpIcon className="h-3 w-3 text-icon group-hover:text-primary" />
                </button>
              </div>
            </div>
          )}
          {deleted ? (
            <p className="font-mono text-secondary text-sm">
              Comment was deleted :(
            </p>
          ) : (
            <InnerHTMLText content={content} />
          )}
        </section>
        {/* // Recursively call the same component for children comments */}
      </div>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} op={op} />
      ))}
    </Fragment>
  );
};

export default Comment;
