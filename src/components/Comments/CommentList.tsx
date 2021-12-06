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
});

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;
  return (
    <Fragment>
      <Title>Comments</Title>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} op={op} />
      ))}
    </Fragment>
  );
};

export default CommentList;
