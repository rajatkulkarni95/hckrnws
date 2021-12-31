import { prettyTime } from "helpers/time";
import Link from "next/link";
import { styled } from "../../../stitches.config";
import { Fragment } from "react";
import UpvoteIcon from "svgs/upvote.svg";
import CommentIcon from "svgs/comment.svg";
import ClockIcon from "svgs/clock.svg";
import ExternalLinkIcon from "svgs/external_link.svg";
import { useTheme } from "next-themes";
import { HyperLink } from "./HyperLink";
import { FlexColumn } from "styles/";

type Props = {
  points: number;
  comments: number;
  time: number;
  id?: number;
  user: string;
  url: string;
  isDetailedView?: boolean;
  domain: string;
};

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  marginTop: "4px",
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
    background: "$accent",
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
  marginTop: "8px",
});

const Meta: React.FC<Props> = ({
  points,
  comments,
  time,
  id,
  user,
  url,
  domain,
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
        <LinkItem css={{ marginRight: "4px" }}>
          <HyperLink
            href={url}
            target="_blank"
            css={{ height: "14px", display: "flex" }}
          >
            <ExternalLinkIcon
              height={14}
              width={14}
              alt="time"
              stroke={stroke}
            />
          </HyperLink>
        </LinkItem>
        {domain && <Text>({domain})</Text>}
      </Box>{" "}
      {isDetailedView && <AuthorText>by {user}</AuthorText>}
    </FlexColumn>
  );
};

export default Meta;
