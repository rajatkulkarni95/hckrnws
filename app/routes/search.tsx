import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import StoryListItem from "~/components/StoryListItem";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/Fragments";
import { StoryListSkeleton } from "~/components/Skeletons";
import type { TBaseStory } from "~/types/story";
import {
  searchStories,
  searchComments,
  searchCounts,
  type TSearchComment,
} from "~/lib/api";
import { SearchIcon } from "~/icons";
import { prettyTime } from "~/helpers/time";
import InnerHTMLText from "~/components/Common/InnerHTMLText";
import { decode } from "html-entities";

type Tab = "posts" | "comments";

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightHTML(html: string, query: string): string {
  if (!query.trim()) return html;
  const words = query.trim().split(/\s+/).map(escapeRegExp).filter(Boolean);
  if (words.length === 0) return html;
  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  // Split on HTML tags to only highlight text content, not inside tags
  return html.replace(/(<[^>]*>)|([^<]+)/g, (match, tag, text) => {
    if (tag) return tag;
    return text.replace(pattern, "<mark>$1</mark>");
  });
}

function HighlightedText({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  if (!query.trim()) return <span className={className}>{text}</span>;
  const words = query.trim().split(/\s+/).map(escapeRegExp).filter(Boolean);
  if (words.length === 0) return <span className={className}>{text}</span>;
  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(pattern);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function CommentResult({
  comment,
  query,
}: {
  comment: TSearchComment;
  query: string;
}) {
  return (
    <div className="py-2 flex flex-col w-full bg-transparent mb-2 border-b border-border-primary">
      <Link to={`/stories/${comment.storyId}`}>
        <p className="text-xs text-text-secondary font-sans mb-1">
          on{" "}
          <HighlightedText
            text={comment.storyTitle}
            query={query}
            className="text-text-primary font-medium"
          />
        </p>
      </Link>
      <div className="text-sm text-text-secondary font-sans">
        <InnerHTMLText content={highlightHTML(comment.text, query)} />
      </div>
      <div className="flex items-center mt-1 gap-2">
        <span className="text-xs text-text-secondary font-sans">
          by <span className="font-semibold text-text-primary">{comment.author}</span>
        </span>
        <span className="text-xs text-text-secondary font-mono">
          {prettyTime(comment.time)}
        </span>
      </div>
    </div>
  );
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("p") || "1");
  const activeTab: Tab = searchParams.get("tab") === "comments" ? "comments" : "posts";

  const [input, setInput] = useState(query);
  const [posts, setPosts] = useState<TBaseStory[] | null>(null);
  const [comments, setComments] = useState<TSearchComment[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [counts, setCounts] = useState<{ posts: number; comments: number } | null>(null);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch counts when query changes
  useEffect(() => {
    if (!query) {
      setCounts(null);
      setHasSearched(false);
      setPosts(null);
      setComments(null);
      return;
    }
    setHasSearched(true);
    searchCounts(query)
      .then(setCounts)
      .catch(() => {});
  }, [query]);

  // Fetch results for active tab
  useEffect(() => {
    if (!query) return;

    setError(false);
    if (activeTab === "posts") {
      setPosts(null);
      searchStories(query, page)
        .then((result) => {
          setPosts(result.stories);
          setTotalPages(Math.min(result.nbPages, 50));
        })
        .catch(() => setError(true));
    } else {
      setComments(null);
      searchComments(query, page)
        .then((result) => {
          setComments(result.comments);
          setTotalPages(Math.min(result.nbPages, 50));
        })
        .catch(() => setError(true));
    }
  }, [query, page, activeTab]);

  useEffect(() => {
    document.title = query ? `Search: ${query} - hckrnws` : "Search - hckrnws";
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim(), p: "1", tab: activeTab });
    }
  };

  const switchTab = (tab: Tab) => {
    setSearchParams({ q: query, p: "1", tab });
  };

  const data = activeTab === "posts" ? posts : comments;

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="mb-4 sm:hidden">
        <div className="flex items-center border border-border-primary rounded bg-bg-secondary">
          <SearchIcon className="h-4 w-4 text-text-icon ml-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Hacker News..."
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
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

      {hasSearched && counts && (
        <div className="flex gap-0 mb-4 border-b border-border-primary">
          <button
            onClick={() => switchTab("posts")}
            className={`px-4 py-2 text-sm font-sans border-b-2 -mb-px ${
              activeTab === "posts"
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            Posts
            <span className="ml-1.5 text-xs font-mono text-text-icon">
              {formatCount(counts.posts)}
            </span>
          </button>
          <button
            onClick={() => switchTab("comments")}
            className={`px-4 py-2 text-sm font-sans border-b-2 -mb-px ${
              activeTab === "comments"
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            Comments
            <span className="ml-1.5 text-xs font-mono text-text-icon">
              {formatCount(counts.comments)}
            </span>
          </button>
        </div>
      )}

      {error && <CenteredText>Oops! Something went wrong :(</CenteredText>}
      {!error && hasSearched && !data && <StoryListSkeleton />}
      {!error && hasSearched && data && data.length === 0 && (
        <CenteredText>No results found for "{query}"</CenteredText>
      )}
      {!error && !hasSearched && (
        <CenteredText>Search stories, posts, and more</CenteredText>
      )}

      {activeTab === "posts" && posts && posts.length > 0 && (
        <>
          {posts.map((story) => (
            <StoryListItem
              story={story}
              key={story.id}
              titleContent={
                <HighlightedText text={decode(story.title)} query={query} />
              }
            />
          ))}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChangePage={(p) =>
              setSearchParams({ q: query, p: String(p), tab: "posts" })
            }
          />
        </>
      )}

      {activeTab === "comments" && comments && comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <CommentResult comment={comment} query={query} key={comment.id} />
          ))}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChangePage={(p) =>
              setSearchParams({ q: query, p: String(p), tab: "comments" })
            }
          />
        </>
      )}
    </div>
  );
}
