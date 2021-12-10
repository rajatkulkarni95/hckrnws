import { FlexColumn } from "styles/";
import { SpaceBetween } from "styles/";
import Link from "next/link";
import { TBaseStory } from "types/story";
import { styled } from "../../stitches.config";
import Meta from "./Common/Meta";
import { HyperLink } from "./Common/HyperLink";

type Props = {
  story: TBaseStory;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time },
  } = props;

  // To hide the job posting's that have no discussions around them
  if (!user) return null;

  return (
    <Box>
      <Link href={`/stories/${id}`} passHref>
        <Title>{title}</Title>
      </Link>
      <HyperLink href={url} target="_blank">
        {url}
      </HyperLink>
      <SpaceBetween css={{ marginTop: "8px" }}>
        <FlexColumn>
          <Meta
            id={id}
            points={points}
            comments={comments_count}
            time={time}
            user={user}
          />
        </FlexColumn>
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
  transition: "0.2s",
  "&:hover": {
    background: "hsl(0, 0%, 13.6%)",
  },

  "@phone": {
    padding: "8px",
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

export default StoryListItem;
