import StoryListPage from "~/components/StoryListPage";

export default function BestStories() {
  return <StoryListPage apiPath="best" category="best" titlePrefix="Best HN" />;
}
