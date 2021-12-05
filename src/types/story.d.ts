export type TBaseStory = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: string;
  url: string;
  domain: string;
};

export type TDetailedStory = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: string;
  content: string;
  comments: Comment[];
};

export type TComment = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: "comment";
  content: string;
  comments: TComment[];
  comments_count: number;
  level: number;
  url: string;
};
