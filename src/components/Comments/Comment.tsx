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
  color: "$secondaryText",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  variants: {
    op: {
      true: {
        color: "#f9c74f",
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
  alignSelf: "flex-end",
});

const Text = styled("div", {
  fontSize: "$2",

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

const CommentContainer = styled("div", {
  padding: "8px 0",
  borderBottom: "1px solid",
  borderColor: "$secondaryText",
  display: "flex",
  flexDirection: "column",
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
      <CommentContainer css={{ marginLeft: `calc(16 * ${level}px)` }}>
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
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} op={op} />
        ))}
    </Fragment>
  );
};

export default Comment;
