import { FlexColumn } from "styles/";
import { prettyTime } from "helpers/time";
import Link from "next/link";
import { styled } from "../../../stitches.config";
import { Fragment } from "react";
import Image from "next/image";
import upvoteIcon from "svgs/upvote.svg";
import commentIcon from "svgs/comment.svg";
import clockIcon from "svgs/clock.svg";

type Props = {
  points: number;
  comments: number;
  time: number;
  id?: number;
  user: string;
  isDetailedView?: boolean;
};

const Box = styled("div", {
  display: "flex",
  marginTop: "12px",
  alignItems: "center",
});

const Item = styled("div", {
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  padding: "4px",
});

const LinkItem = styled("div", {
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  padding: "4px",
  background: "none",
  cursor: "pointer",
  borderRadius: "3px",

  "&:hover": {
    background: "#4a4e69",
  },
});

const Text = styled("p", {
  fontSize: "12px",
  marginLeft: "4px",
});

const AuthorText = styled("p", {
  fontSize: "$1",
  fontWeight: 700,
  color: "$secondaryText",
});

const Meta: React.FC<Props> = ({
  points,
  comments,
  time,
  id,
  user,
  isDetailedView = false,
}) => {
  const renderCommentItem = () => (
    <Fragment>
      <Image height={14} width={14} src={commentIcon} alt="comment" />
      <Text>{comments}</Text>
    </Fragment>
  );

  const renderCommentLink = () =>
    isDetailedView ? (
      <Item>{renderCommentItem()}</Item>
    ) : (
      <Link href={`/stories/${id}`}>
        <LinkItem>{renderCommentItem()}</LinkItem>
      </Link>
    );

  return (
    <FlexColumn>
      <AuthorText>by {user}</AuthorText>
      <Box>
        <Item>
          <Image height={14} width={14} src={upvoteIcon} alt="upvote" />
          <Text>{points}</Text>
        </Item>
        {renderCommentLink()}
        <Item>
          <Image height={14} width={14} src={clockIcon} alt="time" />
          <Text>{prettyTime(time)}</Text>
        </Item>
      </Box>{" "}
    </FlexColumn>
  );
};

export default Meta;
