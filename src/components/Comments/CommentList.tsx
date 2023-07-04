import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { TComment, TStrippedComment } from "~/types/story";
import { CenteredText } from "../Common/Fragments";
import Comment from "./Comment";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  comments: TComment[];
  op: string;
};

const CommentList: React.FC<Props> = (props: Props) => {
  const { comments, op } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const flatListComments: TStrippedComment[] = useMemo(() => [], []);

  const [collapsedComments, setCollapsedComments] = useState<number[]>([]);

  function recursivelyListComments(
    child: TComment[],
    parent?: number | undefined,
    reset: boolean = false
  ) {
    if (reset) {
      flatListComments.splice(0, flatListComments.length);
    }
    const flatListCommentsIds: number[] = flatListComments.map((c) => c.id);
    console.log({ flatListCommentsIds });

    child.forEach((c) => {
      c.parent = parent || undefined;

      if (!flatListCommentsIds.includes(c.id)) {
        // Remove the comments key, because we don't need it anymore, make a copy of the comment, and push it to the flat list
        const strippedComment: TStrippedComment = {
          id: c.id,
          user: c.user,
          level: c.level,
          parent: c.parent,
        };

        flatListComments.push(strippedComment);
      }

      if (!collapsedComments.includes(parent ?? 0) && c.comments.length > 0) {
        recursivelyListComments(c.comments, c.id);
      }
    });
  }

  useEffect(() => {
    recursivelyListComments(comments);
  }, []);

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

  const moveSelectedIndex = (direction: number) => {
    const newIndex = selectedIndex + direction;
    if (newIndex < 0 || newIndex > flatListComments.length - 1) return;

    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const selectedElement = document.querySelector(".activeComment");
    if (!selectedElement) return;

    selectedElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [selectedIndex]);

  useHotkeys("ArrowUp", () => moveSelectedIndex(-1), {
    preventDefault: selectedIndex !== 0,
  });
  useHotkeys("ArrowDown", () => moveSelectedIndex(1), {
    preventDefault: selectedIndex !== flatListComments.length - 1,
  });

  const handleCollapse = (isCollapsed: boolean, id: number) => {
    if (isCollapsed) {
      setCollapsedComments([...collapsedComments, id]);
      recursivelyCollapseComments(id);
    } else {
      setCollapsedComments(collapsedComments.filter((c) => c !== id));
      recursivelyListComments(comments, 0, true);
    }
  };

  console.log({ flatListComments });

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
              highlightedId={flatListComments[selectedIndex]?.id}
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
