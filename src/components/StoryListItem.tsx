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
    story: { title, user, url, id, points, comments_count, time, domain },
  } = props;

  // To hide the job posting's that have no discussions around them
  if (!user) return null;

  return (
    <Box>
      <Link href={`/stories/${id}`} passHref>
        <Title>{title}</Title>
      </Link>
      <SpaceBetween>
        <FlexColumn>
          <Meta
            id={id}
            points={points}
            comments={comments_count}
            time={time}
            user={user}
            url={url}
            domain={domain}
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
  marginBottom: "8px",
  transition: "0.2s",
  borderBottom: "1px dotted",
  "&:hover": {
    background: "$hovered",
  },

  "@phone": {
    padding: "8px",
  },
});

const Title = styled("h4", {
  fontSize: "$2",
  color: "$primaryText",
  whiteSpace: "break-spaces",
  fontWeight: 500,
  cursor: "pointer",
});

export default StoryListItem;
