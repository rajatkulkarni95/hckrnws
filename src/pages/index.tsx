import { NextPage } from "next";
import Link from "next/link";
import { Container } from "../styles";
import { TBaseStory } from "types/story";

type PageProps = {
  response: TBaseStory[];
};

const Home: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  return (
    <Container>
      Hello from Pretty HackerNews!
      <ul>
        {response.map((story) => (
          <li key={story.id}>
            <Link href={`/stories/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export async function getServerSideProps() {
  const domainUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_DOMAIN_URL;
  const res = await fetch(`${domainUrl}/api/stories`);
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

export default Home;
