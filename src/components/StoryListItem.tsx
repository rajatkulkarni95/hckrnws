import Link from "next/link";
import { TBaseStory } from "types/story";
import { styled } from "../../stitches.config";
import Meta from "./Common/Meta";
import useWindowSize from "hooks/useWindowSize";
import { Size } from "types/size";
import useStore from "store/useStore";

type Props = {
  story: TBaseStory;
};

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
});

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
    story,
  } = props;

  const size: Size = useWindowSize();
  const starStory = useStore((state) => state.starStory);
  const starred = useStore((state) => state.starred);

  // Assigning a number greater than the compared value, so that it defaults to false
  const isMobile = (size?.width ?? 641) < 640;

  // To hide the job posting's that have no discussions around them
  if (!user) return null;

  const handleStar = () => {
    // save them to the zustand store, which in turn will save to local storage
    const isStoryStarred = starred?.some((story) => story.id === id);
    if (isStoryStarred) {
      const filteredStories = starred?.filter((story) => story.id !== id);
      starStory(filteredStories);
    } else {
      starStory([...starred, story]);
    }
  };

  return (
    <Box>
      <Link href={`/stories/${id}`} passHref>
        <Title>
          {title} {isMobile && domain && <Text>({domain})</Text>}
        </Title>
      </Link>

      <Meta
        id={id}
        points={points}
        comments={comments_count}
        time={time}
        user={user}
        url={url}
        domain={domain}
        handleStarring={handleStar}
      />
    </Box>
  );
};

const Box = styled("div", {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: "none",
  marginBottom: "8px",
  transition: "0.2s",
  borderBottom: "1px dotted",
  "&:hover": {
    background: "$hovered",
    borderRadius: "4px",
    borderColor: "transparent",
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
