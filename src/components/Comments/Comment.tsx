import { prettyTime } from "helpers/time";
import { Fragment, useEffect, useState } from "react";
import { AlignCenter, SpaceBetween } from "styles/";
import { TComment } from "types/story";
import { styled } from "../../../stitches.config";
import ChevronDown from "svgs/chevron_down.svg";
import ChevronUp from "svgs/chevron_up.svg";
import { contains } from "helpers/contains";
import { useTheme } from "next-themes";

type Props = {
  comment: TComment;
  op: string;
};

const Author = styled("span", {
  fontSize: "$1",
  color: "$primaryText",
  background: "$codeBlock",
  padding: "4px",
  borderRadius: "4px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  variants: {
    op: {
      true: {
        color: "#4970CB",
        background: "#1D2433",
      },
    },
  },
});

const OPTag = styled("span", {
  padding: "4px 6px",
  fontSize: "12px",
  borderRadius: "4px",
  background: "$accent",
  color: "$primaryText",
  marginLeft: "8px",
  fontWeight: 500,
  lineHeight: 1.2,
});

const Time = styled("span", {
  fontSize: "$1",
  color: "$secondaryText",

  "@phone": {
    fontSize: "$0",
  },
});

const Text = styled("div", {
  fontSize: "$2",
  lineHeight: 1.5,

  p: {
    marginBottom: "4px",
    whiteSpace: "break-spaces",
  },

  a: {
    color: "$coloredLink",
    whiteSpace: "break-spaces",
  },

  pre: {
    whiteSpace: "break-spaces",
    padding: "8px",
    background: "$codeBlock",
    borderRadius: "4px",
    margin: "8px 0",
    overflowX: "auto",
  },

  ".quotes": {
    padding: "8px 16px",
    borderLeft: "2px solid",
    color: "$secondaryText",
    marginBottom: "8px",
  },

  code: {
    "@phone": {
      fontSize: "$1",
    },
  },
});

const DeletedComment = styled("i", {
  color: "$secondaryText",
});

const CommentContainer = styled("div", {
  padding: "0 8px 4px 12px",
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  marginBottom: "8px",
  position: "relative",
  width: "100%",
  borderLeft: "2px solid",

  variants: {
    levels: {
      "0": {
        borderLeftColor: "$level0",
      },
      "1": {
        borderLeftColor: "$level1",
      },
      "2": {
        borderLeftColor: "$level2",
      },
      "3": {
        borderLeftColor: "$level3",
      },
      "4": {
        borderLeftColor: "$level4",
      },
      "5": {
        borderLeftColor: "$level5",
      },
      "6": {
        borderLeftColor: "$level6",
      },
      "7": {
        borderLeftColor: "$level7",
      },
    },
  },
});

const CollapseButton = styled("button", {
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
  padding: "4px",
  background: "$accent",
  cursor: "pointer",
  borderRadius: "3px",
  border: "none",

  "&:hover": {
    background: "$secondaryText",
  },
});

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: { user, time, content, deleted, level, comments, comments_count },
    op,
  } = props;
  const isCommenterOP = user === op;
  const [collapsed, setCollapsed] = useState<Boolean>(false);
  const element = document.createElement("div");
  element.innerHTML = content;

  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";

  // find quotes and apply styles
  useEffect(() => {
    contains("p", ">", "quotes");
  }, []);

  if (collapsed)
    return (
      <div style={{ display: "flex" }}>
        <CommentContainer
          css={{
            marginLeft: `calc(16px * ${level})`,
            "@phone": { marginLeft: `calc(8px * ${level})` },
          }}
          levels={level}
        >
          <SpaceBetween css={{ marginBottom: "8px" }}>
            <Author op={isCommenterOP}>
              {user} {isCommenterOP && <OPTag>OP</OPTag>}
            </Author>
            <AlignCenter>
              <OPTag css={{ marginRight: "4px" }}>{comments_count}</OPTag>
              <CollapseButton onClick={() => setCollapsed(false)}>
                <ChevronDown
                  height={14}
                  width={14}
                  alt="unhide"
                  stroke={stroke}
                />
              </CollapseButton>
            </AlignCenter>
          </SpaceBetween>
        </CommentContainer>
      </div>
    );

  return (
    <Fragment>
      {/* Indent the children based on the level */}
      <div style={{ display: "flex" }}>
        <CommentContainer
          css={{
            marginLeft: `calc(16px * ${level})`,
            "@phone": { marginLeft: `calc(8px * ${level})` },
          }}
          levels={level}
        >
          {!deleted && (
            <SpaceBetween css={{ marginBottom: "8px" }}>
              <Author op={isCommenterOP}>
                {user} {isCommenterOP && <OPTag>OP</OPTag>}
              </Author>
              <AlignCenter>
                <Time>{prettyTime(time)}</Time>
                <CollapseButton onClick={() => setCollapsed(true)}>
                  <ChevronUp
                    height={14}
                    width={14}
                    alt="hide"
                    stroke={stroke}
                  />
                </CollapseButton>
              </AlignCenter>
            </SpaceBetween>
          )}
          {deleted ? (
            <DeletedComment>Comment was deleted :(</DeletedComment>
          ) : (
            <Text dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </CommentContainer>
        {/* // Recursively call the same component for children comments */}
      </div>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} op={op} />
      ))}
    </Fragment>
  );
};

export default Comment;
