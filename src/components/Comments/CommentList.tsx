import { Fragment } from "react";
import { TComment } from "types/story";
import { styled } from "../../../stitches.config";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
};

const Title = styled("h3", {
  fontSize: "$4",
  margin: "16px 0",
});

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments } = props;
  return (
    <Fragment>
      <Title>Comments</Title>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Fragment>
  );
};

export default CommentList;
