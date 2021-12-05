import { NextPage } from "next";
import { Container } from "../../styles";

import { useRouter } from "next/router";
import { TDetailedStory } from "types/story";

type PageProps = {
  response: TDetailedStory[];
};

const Story: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { storyId } = router.query;
  const { response } = props;
  return <Container>Hello from Story {storyId}</Container>;
};

export async function getServerSideProps(context: {
  query: { storyId: number };
}) {
  const { storyId } = context.query;

  const domainUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_DOMAIN_URL;
  const res = await fetch(`${domainUrl}/api/stories/${storyId}`);
  const { response } = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      response,
    }, // will be passed to the page component as props
  };
}

export default Story;
