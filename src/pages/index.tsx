import { NextPage } from "next";
import { Container } from "../styles";
import { TStory } from "../types/story";

type PageProps = {
  response: TStory[];
};

const Home: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  return <Container>Hello from Pretty HackerNews!</Container>;
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
