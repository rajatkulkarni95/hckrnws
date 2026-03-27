import StoryListPage from "~/components/StoryListPage";

export default function NewStories() {
  return <StoryListPage apiPath="newest" category="new" titlePrefix="New HN" />;
}
