import Link from "next/link";
import { TBaseStory } from "~/types/story";
import Meta from "~/components/Common/Meta";
import useWindowSize from "~/hooks/useWindowSize";
import { Size } from "~/types/size";
import useStore from "~/store/useStore";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { StarIcon } from "~/icons";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";

type Props = {
  story: TBaseStory;
  selected?: boolean;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
    story,
    selected,
  } = props;
  const [isStoryStarred, setIsStoryStarred] = useState(false);

  const size: Size = useWindowSize();
  const starStory = useStore((state) => state.starStory);
  const starred = useStore((state) => state.starred);
  const router = useRouter();

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

  useHotkeys(
    "enter",
    () => {
      router.push(`/stories/${id}`);
    },
    {
      enabled: selected,
    }
  );

  useHotkeys(
    "v",
    () => {
      window.open(url, "_blank");
    },
    {
      enabled: selected,
    }
  );

  useHotkeys("shift+s", handleStar, {
    enabled: selected,
  });

  useEffect(() => {
    setIsStoryStarred(starred?.some((story) => story.id === id));
  }, [starred, id]);

  // To hide the job posting's that have no discussions around them
  if (!user) return null;

  return (
    <div
      className={`p-2 flex flex-col w-full mb-2 duration-100 border-b ${
        selected
          ? "bg-hover rounded border-transparent activeElement"
          : "border-primary rounded-none hover:rounded bg-transparent hover:bg-hover hover:border-transparent"
      }`}
    >
      <Link href={`/stories/${id}`} passHref>
        <h3
          className={`text-base text-secondary whitespace-pre-line font-medium duration-100 cursor-default font-sans hover:text-primary`}
        >
          {decode(title)}{" "}
        </h3>
      </Link>
      {domain && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs whitespace-nowrap font-normal mb-0.5 border-b hover:text-primary border-primary w-fit font-mono text-secondary mt-0.5 focus-visible:ring-1 focus-visible:ring-blue-500"
        >
          ({domain})
        </a>
      )}
      <div className="flex items-center justify-between">
        <Meta
          id={id}
          points={points}
          comments={comments_count}
          time={time}
          user={user}
          url={url}
        />
        <button
          className="flex mr-2 p-1 w-fit items-center cursor-default rounded border-none hover:bg-hover focus-visible:ring-1 focus-visible:ring-blue-500"
          onClick={handleStar}
        >
          <StarIcon
            className={`h-3 w-3 ${
              isStoryStarred ? "text-amber-400" : "text-icon"
            }`}
          />
          <span className="text-xs ml-1 text-secondary font-sans">
            {isStoryStarred ? "Starred" : "Star"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StoryListItem;
