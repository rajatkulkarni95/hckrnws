import { Fragment } from "react";
import { TComment } from "~/types/story";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
  op: string;
};

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;
  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        <Fragment>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} op={op} />
          ))}
        </Fragment>
      ) : (
        <p className="font-coolSans text-base text-primary font-normal text-center">
          No comments posted yet!
        </p>
      )}
    </div>
  );
};

export default CommentList;
