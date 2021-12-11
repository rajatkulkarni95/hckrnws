import { TComment } from "types/story";

export const exampleComment: TComment = {
  id: 29518874,
  user: "Tepix",
  time: 1639202913,
  time_ago: "an hour ago",
  type: "comment",
  content:
    "<p>The project comes across as arrogant. Perhaps it&#x27;s just me.",
  comments: [
    {
      id: 29519079,
      user: "uudecoded",
      time: 1639205929,
      time_ago: "a minute ago",
      type: "comment",
      content:
        "<p>I do not believe the word &quot;arrogant&quot; can accurately represent a contribution to the community with the aim of highlighting the actual and emotional injury that results from an ill-considered implementation of a specification that enables input string based remote code execution.<p>I think we all can agree that any project aimed at highlighting a major RCE – satirical, grandiose, exaggerated, self-important, or otherwise – is a net benefit for infosec and the community.",
      comments: [],
      comments_count: 0,
      level: 1,
      url: "item?id=29519079",
    },
    {
      id: 29518924,
      user: "bradfitz",
      time: 1639203598,
      time_ago: "40 minutes ago",
      type: "comment",
      content:
        "<p>I almost stopped myself from posting it over such concerns, but I wasn&#x27;t about to let all those minutes go to waste without sharing a joke to some. It was really just meant for Twitter banter.<p>I was just screwing around bored in transit while reading about all log4j substitution types.",
      comments: [],
      comments_count: 0,
      level: 1,
      url: "item?id=29518924",
    },
  ],
  comments_count: 2,
  level: 0,
  url: "item?id=29518874",
};
