import Link from "next/link";
import { TBaseStory } from "~/types/story";
import Meta from "~/components/Common/Meta";
import useWindowSize from "~/hooks/useWindowSize";
import { Size } from "~/types/size";
import useStore from "~/store/useStore";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

type Props = {
  story: TBaseStory;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
    story,
  } = props;
  const [isStoryStarred, setIsStoryStarred] = useState(false);

  const size: Size = useWindowSize();
  const starStory = useStore((state) => state.starStory);
  const starred = useStore((state) => state.starred);

  useEffect(() => {
    setIsStoryStarred(starred?.some((story) => story.id === id));
  }, [starred, id]);

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
    <div className="py-2 flex flex-col w-full bg-transparent mb-2 duration-100 border-b border-primary hover:border-secondary">
      <Link href={`/stories/${id}`} passHref>
        <h3
          className={`text-base text-secondary whitespace-pre-line font-medium duration-100 cursor-pointer font-coolSans hover:text-primary`}
        >
          {decode(title)}{" "}
        </h3>
      </Link>
      {domain && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-normal mb-0.5 border-b hover:text-primary border-primary w-fit font-mono text-tertiary mt-0.5"
        >
          ({domain})
        </a>
      )}
      <Meta
        id={id}
        points={points}
        comments={comments_count}
        time={time}
        user={user}
        url={url}
        handleStarring={handleStar}
        isStoryStarred={isStoryStarred}
      />
    </div>
  );
};

export default StoryListItem;
