import StoryListPage from "~/components/StoryListPage";

export default function ShowStories() {
  return (
    <StoryListPage
      apiPath="show"
      category="show"
      titlePrefix="Show HN"
      totalPages={2}
    />
  );
}
