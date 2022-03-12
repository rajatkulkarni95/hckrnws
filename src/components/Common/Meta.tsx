import { prettyTime } from "helpers/time";
import Link from "next/link";
import { styled } from "../../../stitches.config";
import { Fragment, MouseEventHandler } from "react";
import UpvoteIcon from "svgs/upvote.svg";
import CommentIcon from "svgs/comment.svg";
import ClockIcon from "svgs/clock.svg";
import StarIcon from "svgs/star.svg";
import ExternalLinkIcon from "svgs/external_link.svg";
import { useTheme } from "next-themes";
import { FlexColumn, SpaceBetween } from "styles/";
import { Size } from "types/size";
import useWindowSize from "hooks/useWindowSize";
import { isHackerNewsLink } from "helpers/contains";

type Props = {
  points: number;
  comments: number;
  time: number;
  id?: number;
  user: string;
  url: string;
  isDetailedView?: boolean;
  domain: string;
  handleStarring: MouseEventHandler<HTMLButtonElement>;
  isStoryStarred: boolean;
};

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Item = styled("div", {
  display: "flex",
  marginRight: "8px",
  padding: "4px",
  paddingLeft: 0,
});

const LinkItem = styled("button", {
  display: "flex",
  marginRight: "8px",
  padding: "4px",
  background: "none",
  cursor: "pointer",
  borderRadius: "3px",
  border: "none",

  "&:hover": {
    background: "$accent",
  },
});

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
  color: "$primaryText",
  fontFamily: "$sans",
});

const AuthorText = styled("span", {
  fontSize: "$1",
  fontWeight: 500,
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
  handleStarring,
  isStoryStarred,
  isDetailedView = false,
}) => {
  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";

  const size: Size = useWindowSize();

  const starColor = theme === "light" ? "#FFB224" : "#F1A10D";

  const externalLink = isHackerNewsLink(url) ? `/stories/${id}` : url;

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
        <LinkItem as="a" css={{ textDecoration: "none" }}>
          {renderCommentItem()}
        </LinkItem>
      </Link>
    );

  // Assigning a number greater than the compared value, so that it defaults to false
  const isMobile = (size?.width ?? 641) < 640;

  return (
    <FlexColumn>
      <SpaceBetween css={{ marginTop: "4px" }}>
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
            <a href={externalLink} target="_blank" rel="noreferrer noopener">
              <ExternalLinkIcon
                height={14}
                width={14}
                alt="time"
                stroke={stroke}
              />
            </a>
          </LinkItem>
          {domain && !isMobile && <Text>({domain})</Text>}
        </Box>
        <LinkItem onClick={handleStarring}>
          <StarIcon
            height={14}
            width={14}
            alt="star"
            stroke={isStoryStarred ? "none" : stroke}
            fill={isStoryStarred ? starColor : "none"}
          />
          <Text>{isStoryStarred ? "Starred" : "Star"}</Text>
        </LinkItem>
      </SpaceBetween>
      {isDetailedView && <AuthorText>by {user}</AuthorText>}
    </FlexColumn>
  );
};

export default Meta;
