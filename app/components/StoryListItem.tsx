import { Link } from "react-router";
import { TBaseStory } from "~/types/story";
import Meta from "~/components/Common/Meta";
import { useStarred } from "~/lib/starred";
import { decode } from "html-entities";
import { StarIcon } from "~/icons";

type Props = {
  story: TBaseStory;
};

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
    story,
  } = props;

  const { toggleStar, isStarred } = useStarred();
  const starred = isStarred(id);

  if (!user) return null;

  return (
    <div className="py-2 flex flex-col w-full bg-transparent mb-2 duration-100 border-b border-border-primary hover:border-border-secondary">
      <Link to={`/stories/${id}`}>
        <h3
          className={`text-base text-text-secondary whitespace-pre-line font-medium duration-100 cursor-default font-sans hover:text-text-primary`}
        >
          {decode(title)}{" "}
        </h3>
      </Link>
      {domain && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs whitespace-nowrap font-normal mb-0.5 border-b hover:text-text-primary border-border-primary w-fit font-mono text-text-secondary mt-0.5 focus-visible:ring-1 focus-visible:ring-blue-500"
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
          className="flex mr-2 p-1 w-fit items-center cursor-default rounded border-none hover:bg-bg-hover focus-visible:ring-1 focus-visible:ring-blue-500"
          onClick={() => toggleStar(story)}
        >
          <StarIcon
            className={`h-3 w-3 ${
              starred ? "text-amber-400" : "text-text-icon"
            }`}
          />
          <span className="text-xs ml-1 text-text-secondary font-sans">
            {starred ? "Starred" : "Star"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StoryListItem;
