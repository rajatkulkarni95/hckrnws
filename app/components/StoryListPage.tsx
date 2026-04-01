import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import StoryListItem from "~/components/StoryListItem";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/Fragments";
import { StoryListSkeleton } from "~/components/Skeletons";
import type { TBaseStory } from "~/types/story";
import { fetchStoryList, type TTimeRange, type TBestRange } from "~/lib/api";

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
  const [searchParams] = useSearchParams();
  const pageNum = parseInt(number || "1");

  const defaultRange = apiPath === "best" ? "48h" : "day";
  const timeRange = (searchParams.get("range") as TTimeRange | TBestRange) || defaultRange;

  const [data, setData] = useState<TBaseStory[] | null>(null);
  const [error, setError] = useState(false);
  const [actualTotalPages, setActualTotalPages] = useState<number | undefined>(totalPages);

  useEffect(() => {
    setData(null);
    setError(false);
    fetchStoryList(apiPath, pageNum, timeRange)
      .then((result) => {
        setData(result.stories);
        setActualTotalPages(result.nbPages);
      })
      .catch(() => setError(true));
  }, [apiPath, pageNum, timeRange]);

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
        onChangePage={(page) =>
          navigate(`/${category}/${page}?range=${timeRange}`)
        }
        totalPages={actualTotalPages}
      />
    </div>
  );
}
