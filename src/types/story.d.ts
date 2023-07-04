export type TBaseStory = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago?: string;
  type?: string;
  url: string;
  domain: string;
  comments_count: number;
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
  comments: TComment[];
  url: string;
  domain: string;
};

export type TComment = {
  id: number;
  user: string;
  time: number;
  time_ago: string;
  type: "comment";
  content: string;
  comments: TComment[];
  comments_count: number;
  level: number;
  url: string;
  deleted?: boolean;
  parent?: number;
};

export type TStrippedComment = {
  id: number;
  user: string;
  parent?: number;
  level: number;
};

export type PageProps = {
  data: TBaseStory[];
  errorCode: false | number;
};
