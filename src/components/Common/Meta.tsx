import { FlexColumn } from "styles/";
import { prettyTime } from "helpers/time";
import Link from "next/link";
import { styled } from "../../../stitches.config";
import { Fragment } from "react";
import UpvoteIcon from "svgs/upvote.svg";
import CommentIcon from "svgs/comment.svg";
import ClockIcon from "svgs/clock.svg";
import { useTheme } from "next-themes";

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
  paddingLeft: 0,
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
    background: "$codeBlock",
  },
});

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
});

const AuthorText = styled("span", {
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
  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";
  const renderCommentItem = () => (
    <Fragment>
      <CommentIcon height={14} width={14} alt="comment" stroke={stroke} />
      <Text>{comments}</Text>
    </Fragment>
  );

  const renderCommentLink = () =>
    isDetailedView ? (
      <Item>{renderCommentItem()}</Item>
    ) : (
      <Link href={`/stories/${id}`} passHref>
        <LinkItem>{renderCommentItem()}</LinkItem>
      </Link>
    );

  return (
    <FlexColumn>
      <AuthorText>by {user}</AuthorText>
      <Box>
        <Item>
          <UpvoteIcon height={14} width={14} alt="upvote" stroke={stroke} />
          <Text>{points}</Text>
        </Item>
        {renderCommentLink()}
        <Item>
          <ClockIcon height={14} width={14} alt="time" stroke={stroke} />
          <Text>{prettyTime(time)}</Text>
        </Item>
      </Box>{" "}
    </FlexColumn>
  );
};

export default Meta;
