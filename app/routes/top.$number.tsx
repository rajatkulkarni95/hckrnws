import StoryListPage from "~/components/StoryListPage";

export default function TopStories() {
  return <StoryListPage apiPath="news" category="top" titlePrefix="Top HN" />;
}
