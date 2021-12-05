import { NextPage } from "next";
import { Container } from "../styles";
import { TStory } from "../types/story";

type PageProps = {
  response: TStory[];
};

const Home: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  console.log("response", response);
  return <Container>Hello from Pretty HackerNews!</Container>;
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/stories");
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
