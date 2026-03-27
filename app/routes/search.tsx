import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import StoryListItem from "~/components/StoryListItem";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/Fragments";
import { StoryListSkeleton } from "~/components/Skeletons";
import type { TBaseStory } from "~/types/story";
import { searchStories } from "~/lib/api";
import { SearchIcon } from "~/icons";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("p") || "1");

  const [input, setInput] = useState(query);
  const [data, setData] = useState<TBaseStory[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query) {
      setData(null);
      setHasSearched(false);
      return;
    }
    setData(null);
    setError(false);
    setHasSearched(true);
    searchStories(query, page)
      .then((result) => {
        setData(result.stories);
        setTotalPages(Math.min(result.nbPages, 50));
      })
      .catch(() => setError(true));
  }, [query, page]);

  useEffect(() => {
    document.title = query ? `Search: ${query} - hckrnws` : "Search - hckrnws";
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim(), p: "1" });
    }
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center border border-border-primary rounded bg-bg-secondary">
          <SearchIcon className="h-4 w-4 text-text-icon ml-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Hacker News..."
            className="flex-1 bg-transparent text-sm text-text-primary font-sans px-3 py-2.5 outline-none placeholder:text-text-icon"
          />
          {input && (
            <button
              type="button"
              onClick={() => {
                setInput("");
                inputRef.current?.focus();
              }}
              className="text-text-icon hover:text-text-primary text-xs font-mono px-2 py-1 mr-1"
            >
              clear
            </button>
          )}
        </div>
      </form>

      {error && <CenteredText>Oops! Something went wrong :(</CenteredText>}
      {!error && hasSearched && !data && <StoryListSkeleton />}
      {!error && hasSearched && data && data.length === 0 && (
        <CenteredText>No results found for "{query}"</CenteredText>
      )}
      {!error && !hasSearched && (
        <CenteredText>Search stories, posts, and more</CenteredText>
      )}
      {data && data.length > 0 && (
        <>
          {data.map((story) => (
            <StoryListItem story={story} key={story.id} />
          ))}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChangePage={(p) => setSearchParams({ q: query, p: String(p) })}
          />
        </>
      )}
    </div>
  );
}
