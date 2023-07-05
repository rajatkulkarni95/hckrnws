import { prettyTime } from "~/helpers/time";
import { Fragment, useEffect, useState } from "react";
import { TComment } from "~/types/story";
import { ChevronDownIcon, ChevronUpIcon, ClipboardIcon } from "~/icons";
import { contains } from "~/helpers/contains";
import InnerHTMLText from "~/components/Common/InnerHTMLText";
import { Size } from "~/types/size";
import useWindowSize from "~/hooks/useWindowSize";
import { useHover } from "~/hooks/useHover";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  comment: TComment;
  op: string;
  handleCollapse: (isCollapsed: boolean, id: number) => void;
  highlightedId: number;
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
    handleCollapse,
    highlightedId,
  } = props;
  const isCommenterOP = user === op;
  const [collapsed, setCollapsed] = useState<Boolean>(false);

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const isHighlighted = highlightedId === id;

  // find quotes and apply styles
  useEffect(() => {
    contains("p", ">", "quotes");
  }, []);

  const size: Size = useWindowSize();
  const isMobile = (size?.width ?? 641) < 640;

  const margin = isMobile ? 8 : 16;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    handleCollapse(!collapsed, id);
  };

  useHotkeys("space", toggleCollapse, {
    preventDefault: true,
    enabled: isHighlighted,
  });

  if (collapsed)
    return (
      <div className="flex" ref={hoverRef}>
        <section
          className={`pt-1 pr-2 mb-1 pb-1 pl-3 flex flex-col relative w-full border-l-2 border-primary ${
            isHighlighted ? "bg-hover activeComment" : "bg-transparent"
          }`}
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
              {(isHovered || isMobile || isHighlighted) && (
                <button
                  className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_VERCEL_URL}/stories/${id}`
                    );
                  }}
                  tabIndex={-1}
                >
                  <ClipboardIcon className="h-3 w-3 text-icon mr-2 group-hover:text-primary" />
                </button>
              )}
              <span className="py-0.5 px-1.5 text-secondary font-mono bg-tertiary rounded text-[10px]">
                {comments_count}
              </span>
              <button
                className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                onClick={toggleCollapse}
                tabIndex={-1}
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
          className={`pt-2 pr-2 mb-1 pb-1 pl-3 flex flex-col relative w-full border-l-2 border-primary ${
            highlightedId === id ? "bg-hover activeComment" : "bg-transparent"
          }`}
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
                {(isHovered || isMobile || isHighlighted) && (
                  <button
                    className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_VERCEL_URL}/stories/${id}`
                      );
                    }}
                    tabIndex={-1}
                  >
                    <ClipboardIcon className="h-3 w-3 text-icon mr-2 group-hover:text-primary" />
                  </button>
                )}
                <span className="text-secondary font-mono text-[10px]">
                  {prettyTime(time)}
                </span>
                <button
                  className="p-1 ml-2 group focus-visible:ring-1 focus-visible:ring-blue-500"
                  onClick={toggleCollapse}
                  tabIndex={-1}
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
        <Comment
          key={comment.id}
          comment={comment}
          op={op}
          handleCollapse={handleCollapse}
          highlightedId={highlightedId}
        />
      ))}
    </Fragment>
  );
};

export default Comment;
