import { useEffect } from "react";
import StoryListItem from "~/components/StoryListItem";
import { useStarred } from "~/lib/starred";

export default function Star() {
  const { starred } = useStarred();

  useEffect(() => {
    document.title = "Starred";
  }, []);

  return (
    <>
      <h3 className="text-lg mt-4 text-text-secondary font-medium">
        You starred <span className="text-amber-400">{starred?.length}</span>{" "}
        stories
      </h3>
      <div className="flex flex-col mt-8">
        {starred?.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </div>
    </>
  );
}
