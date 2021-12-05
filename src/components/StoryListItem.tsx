import { FlexColumn } from "styles/";
import { SpaceBetween } from "styles/";
import Link from "next/link";
import { TBaseStory } from "types/story";
import { styled } from "../../stitches.config";
import { VisitLink } from "./Button";
import Meta from "./Common/Meta";

type Props = {
  story: TBaseStory;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time },
  } = props;

  return (
    <Box>
      <Link href={`/stories/${id}`}>
        <Title>{title}</Title>
      </Link>
      <SpaceBetween>
        <FlexColumn>
          <AuthorText>by {user}</AuthorText>
          <Meta points={points} comments={comments_count} time={time} />
        </FlexColumn>
        <VisitLink href={url} target="_blank">
          Visit
        </VisitLink>
      </SpaceBetween>
    </Box>
  );
};

const Box = styled("div", {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: "none",
  borderRadius: "4px",
  marginBottom: "16px",

  "&:hover": {
    background: "hsl(0, 0%, 13.6%)",
  },
});

const Title = styled("p", {
  fontSize: "$2",
  color: "$primaryText",
  whiteSpace: "break-spaces",
  marginBottom: "8px",
  fontWeight: 500,
  cursor: "pointer",
});

const AuthorText = styled("p", {
  fontSize: "$1",
  fontWeight: 700,
  color: "$secondaryText",
});

export default StoryListItem;
