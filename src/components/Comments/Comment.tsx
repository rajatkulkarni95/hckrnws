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
};

const Author = styled("p", {
  fontSize: "$1",
  color: "$primaryText",
  fontWeight: 500,
});

const Time = styled("p", {
  fontSize: "$1",
  color: "$secondaryText",
  alignSelf: "flex-end",
});

const Text = styled("p", {
  fontSize: "$2",

  p: {
    marginBottom: "8px",
  },

  a: {
    color: "$coloredLink",
  },
});

const DeletedComment = styled("i", {
  color: "$secondaryText",
});

const CommentContainer = styled("div", {
  padding: "8px",
  borderBottom: "1px solid",
  borderColor: "$secondaryText",
  display: "flex",
  flexDirection: "column",
});

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: { user, time, content, deleted, level, comments },
  } = props;
  return (
    <Fragment>
      {/* Indent the children based on the level */}
      <CommentContainer css={{ marginLeft: `calc(16 * ${level}px)` }}>
        {!deleted && (
          <SpaceBetween css={{ marginBottom: "8px" }}>
            <Author>{user}</Author>
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
          <Comment key={comment.id} comment={comment} />
        ))}
    </Fragment>
  );
};

export default Comment;
