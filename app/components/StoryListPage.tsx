import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StoryListItem from "~/components/StoryListItem";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/Fragments";
import { StoryListSkeleton } from "~/components/Skeletons";
import type { TBaseStory } from "~/types/story";

type Props = {
  apiPath: string;
  category: string;
  titlePrefix: string;
  totalPages?: number;
};

export default function StoryListPage({
  apiPath,
  category,
  titlePrefix,
  totalPages,
}: Props) {
  const { number } = useParams();
  const navigate = useNavigate();
  const pageNum = parseInt(number || "1");

  const [data, setData] = useState<TBaseStory[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
    setError(false);
    fetch(`https://api.hnpwa.com/v0/${apiPath}/${pageNum}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [apiPath, pageNum]);

  useEffect(() => {
    document.title = `${titlePrefix} - Page ${pageNum}`;
  }, [titlePrefix, pageNum]);

  if (error) return <CenteredText>Oops! Something went wrong :(</CenteredText>;
  if (!data) return <StoryListSkeleton />;

  return (
    <div className="flex-1">
      {data.map((story) => (
        <StoryListItem story={story} key={story.id} />
      ))}
      <Pagination
        currentPage={pageNum}
        onChangePage={(page) => navigate(`/${category}/${page}`)}
        totalPages={totalPages}
      />
    </div>
  );
}
