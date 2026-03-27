import StoryListPage from "~/components/StoryListPage";

export default function AskStories() {
  return (
    <StoryListPage
      apiPath="ask"
      category="ask"
      titlePrefix="Ask HN"
      totalPages={2}
    />
  );
}
