import type { TBaseStory, TDetailedStory, TComment } from "~/types/story";

const ALGOLIA_BASE = "https://hn.algolia.com/api/v1";

type AlgoliaHit = {
  objectID: string;
  title: string;
  url: string | null;
  author: string;
  points: number;
  num_comments: number;
  created_at_i: number;
  story_text?: string | null;
};

type AlgoliaSearchResponse = {
  hits: AlgoliaHit[];
  nbPages: number;
  page: number;
  hitsPerPage: number;
};

type AlgoliaItem = {
  id: number;
  title: string;
  url: string | null;
  author: string;
  points: number;
  created_at_i: number;
  text: string | null;
  children: AlgoliaComment[];
};

type AlgoliaComment = {
  id: number;
  author: string | null;
  created_at_i: number;
  text: string | null;
  children: AlgoliaComment[];
};

function getDomain(url: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function mapHitToBaseStory(hit: AlgoliaHit): TBaseStory {
  return {
    id: parseInt(hit.objectID),
    title: hit.title || "",
    points: hit.points || 0,
    user: hit.author || "",
    time: hit.created_at_i,
    url: hit.url || `item?id=${hit.objectID}`,
    domain: getDomain(hit.url),
    comments_count: hit.num_comments || 0,
  };
}

function mapAlgoliaComment(
  comment: AlgoliaComment,
  level: number
): TComment {
  const children = (comment.children || [])
    .filter((c) => c.author !== null)
    .map((c) => mapAlgoliaComment(c, level + 1));

  return {
    id: comment.id,
    user: comment.author || "[deleted]",
    time: comment.created_at_i,
    time_ago: "",
    type: "comment",
    content: comment.text || "",
    comments: children,
    comments_count: countComments(comment.children || []),
    level,
    url: "",
    deleted: !comment.author || !comment.text,
  };
}

function countComments(children: AlgoliaComment[]): number {
  let count = 0;
  for (const child of children) {
    count += 1 + countComments(child.children || []);
  }
  return count;
}

// Tag mapping for story list endpoints
const TAG_MAP: Record<string, string> = {
  news: "front_page",
  newest: "story",
  ask: "ask_hn",
  show: "show_hn",
};

export async function fetchStoryList(
  apiPath: string,
  page: number
): Promise<TBaseStory[]> {
  const tag = TAG_MAP[apiPath];
  if (!tag) throw new Error(`Unknown api path: ${apiPath}`);

  const algoliaPage = page - 1; // Algolia is 0-indexed
  const sortByDate = apiPath === "newest";
  const endpoint = sortByDate ? "search_by_date" : "search";

  const res = await fetch(
    `${ALGOLIA_BASE}/${endpoint}?tags=${tag}&hitsPerPage=30&page=${algoliaPage}`
  );
  if (!res.ok) throw new Error("Failed to fetch");

  const data: AlgoliaSearchResponse = await res.json();
  return data.hits.map(mapHitToBaseStory);
}

export async function fetchStoryDetail(
  id: string
): Promise<TDetailedStory> {
  const res = await fetch(`${ALGOLIA_BASE}/items/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");

  const data: AlgoliaItem = await res.json();
  const comments = (data.children || [])
    .filter((c) => c.author !== null)
    .map((c) => mapAlgoliaComment(c, 0));

  return {
    id: data.id,
    title: data.title || "",
    points: data.points || 0,
    user: data.author || "",
    time: data.created_at_i,
    time_ago: "",
    type: "story",
    content: data.text || "",
    comments,
    url: data.url || `item?id=${data.id}`,
    domain: getDomain(data.url),
  };
}

export async function searchStories(
  query: string,
  page: number
): Promise<{ stories: TBaseStory[]; nbPages: number }> {
  const algoliaPage = page - 1;
  const res = await fetch(
    `${ALGOLIA_BASE}/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=30&page=${algoliaPage}`
  );
  if (!res.ok) throw new Error("Failed to fetch");

  const data: AlgoliaSearchResponse = await res.json();
  return {
    stories: data.hits.map(mapHitToBaseStory),
    nbPages: data.nbPages,
  };
}
