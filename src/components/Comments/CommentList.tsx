import { Fragment, useEffect, useMemo, useState } from "react";
import { TComment } from "~/types/story";
import { CenteredText } from "../Common/Fragments";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
  op: string;
};

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;

  const flatListComments: TComment[] = useMemo(() => [], []);

  const [collapsedComments, setCollapsedComments] = useState<number[]>([]);

  function recursivelyListComments(child: TComment[], parent?: number) {
    const flatListCommentsIds: number[] = flatListComments.map((c) => c.id);

    child.forEach((c) => {
      if (parent) {
        c.parent = parent;
      }
      if (!flatListCommentsIds.includes(c.id)) {
        flatListComments.push(c);
      }

      if (!collapsedComments.includes(parent ?? 0) && c.comments.length > 0) {
        recursivelyListComments(c.comments, c.id);
      }
    });
  }

  useEffect(() => {
    recursivelyListComments(comments);
  }, [collapsedComments, comments]);

  // When a comment is collapsed, we need to recursively remove all of its children from the flat list, so that they don't get rendered
  // We shouldn't alter the collapsedComments array, because that would cause a re-render, we should instead remove the children from the flat list
  function recursivelyCollapseComments(id: number) {
    const children = flatListComments.filter((c) => c.parent === id);
    children.forEach((c) => {
      // remove child from flat list
      flatListComments.splice(flatListComments.indexOf(c), 1);
      // recursively remove child's children
      recursivelyCollapseComments(c.id);
    });
  }

  const handleCollapse = (isCollapsed: boolean, id: number) => {
    if (isCollapsed) {
      setCollapsedComments([...collapsedComments, id]);
      recursivelyCollapseComments(id);
    } else {
      setCollapsedComments(collapsedComments.filter((c) => c !== id));
    }
  };

  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        <Fragment>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              op={op}
              handleCollapse={handleCollapse}
            />
          ))}
        </Fragment>
      ) : (
        <CenteredText>No comments posted yet!</CenteredText>
      )}
    </div>
  );
};

export default CommentList;
