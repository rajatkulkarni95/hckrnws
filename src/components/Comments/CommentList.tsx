import { CenteredText } from "styles/";
import { Fragment } from "react";
import { TComment } from "types/story";
import { styled } from "../../../stitches.config";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
  op: string;
};

const Title = styled("h3", {
  fontSize: "$4",
  margin: "16px 0",

  "@phone": {
    fontSize: "$3",
  },
});

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;
  return (
    <Fragment>
      {comments.length > 0 ? (
        <Fragment>
          <Title>Comments</Title>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              op={op}
              parentCommentId={comment.id}
              rootCommentId={comment.id}
            />
          ))}
        </Fragment>
      ) : (
        <CenteredText css={{ fontWeight: 700 }}>
          No comments posted yet!
        </CenteredText>
      )}
    </Fragment>
  );
};

export default CommentList;
