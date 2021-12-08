import { prettyTime } from "helpers/time";
import { Fragment } from "react";
import { FlexColumn, SpaceBetween } from "styles/";
import { TComment } from "types/story";
import { styled } from "../../../stitches.config";

type Props = {
  comment: {
    user: string;
    time: number;
    level?: number;
    content: string;
    deleted?: boolean;
    comments: TComment[];
  };
  op: string;
};

const Author = styled("p", {
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
  padding: "2px 4px",
  fontSize: "12px",
  borderRadius: "4px",
  background: "$secondaryText",
  color: "$primaryText",
  marginLeft: "8px",
  fontWeight: 500,
});

const Time = styled("p", {
  fontSize: "$1",
  color: "$secondaryText",

  "@phone": {
    fontSize: "$0",
  },
});

const Text = styled("div", {
  fontSize: "$2",

  "@phone": {
    fontSize: "$1",
  },

  p: {
    marginBottom: "8px",
    whiteSpace: "break-spaces",
  },

  a: {
    color: "$coloredLink",
  },

  pre: {
    whiteSpace: "break-spaces",
    padding: "8px",
    background: "$codeBlock",
    borderRadius: "4px",
    margin: "8px 0",
    overflowX: "scroll",
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

const CommentBorder = styled("p", {});

const CommentContainer = styled("div", {
  padding: "0 8px",
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
        borderColor: "$level0",
      },
      "1": {
        borderColor: "$level1",
      },
      "2": {
        borderColor: "$level2",
      },
      "3": {
        borderColor: "$level3",
      },
      "4": {
        borderColor: "$level4",
      },
      "5": {
        borderColor: "$level5",
      },
      "6": {
        borderColor: "$level6",
      },
      "7": {
        borderColor: "$level7",
      },
    },
  },
});

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: { user, time, content, deleted, level, comments },
    op,
  } = props;
  const isCommenterOP = user === op;

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
              <Time>{prettyTime(time)}</Time>
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
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} op={op} />
        ))}
    </Fragment>
  );
};

export default Comment;
