import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { TDetailedStory } from "~/types/story";
import CommentList from "~/components/Comments/CommentList";
import Meta from "~/components/Common/Meta";
import { BackIcon, StarIcon } from "~/icons";
import { useStarred } from "~/lib/starred";
import { decode } from "html-entities";
import InnerHTMLText from "~/components/Common/InnerHTMLText";
import { CenteredText } from "~/components/Common/Fragments";

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleStar, isStarred } = useStarred();

  const [data, setData] = useState<TDetailedStory | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.hnpwa.com/v0/item/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    if (data) {
      document.title = `${decode(data.title)} - hckrnws`;
    }
  }, [data]);

  if (error) return <CenteredText>Oops! Something went wrong :(</CenteredText>;
  if (!data) return <CenteredText>Loading...</CenteredText>;

  const { title, points, user, time, content, comments, domain } = data;
  let { url } = data;

  if (url.startsWith("item?id=")) {
    url = url.replace("item?id=", "");
  }

  const story = {
    id: data.id,
    title,
    points,
    user,
    time,
    url,
    domain,
    comments_count: comments.length,
  };

  const starred = isStarred(data.id);

  return (
    <div className="flex flex-col flex-1 mb-8">
      <button
        className="px-2 py-1 bg-transparent rounded flex items-center mb-2 w-fit group hover:bg-bg-hover focus-visible:ring-1 focus-visible:ring-blue-500"
        onClick={() => navigate(-1)}
      >
        <BackIcon className="w-3 h-3 text-text-icon group-hover:text-text-primary" />
        <span className="text-xs ml-1 font-mono text-text-secondary group-hover:text-text-primary">
          Back
        </span>
      </button>
      <div className="flex flex-col p-4 bg-bg-primary border border-border-primary rounded">
        <h2 className="text-lg md:text-xl font-medium text-text-primary m-0 mb-1 font-sans">
          {decode(title)}
        </h2>
        <div className="flex items-center">
          {domain && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mr-3 max-w-[128px] md:max-w-full truncate md:whitespace-normal md:overflow-visible font-normal mb-0.5 border-b hover:text-text-primary border-border-primary w-fit font-mono text-text-secondary mt-0.5"
            >
              ({domain})
            </a>
          )}
          <Meta
            time={time}
            points={points}
            user={user}
            isDetailedView
            comments={comments.length}
            url={url}
          />
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs ml-0.5 text-text-secondary font-normal font-sans">
            by <span className="font-semibold text-text-primary">{user}</span>
          </p>
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
        {content && <InnerHTMLText content={content} isDescription />}
      </div>
      <CommentList comments={comments} op={user} />
    </div>
  );
}
