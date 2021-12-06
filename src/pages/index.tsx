import { NextPage } from "next";
import { TBaseStory } from "types/story";
import { styled } from "../../stitches.config";
import StoryListItem from "@components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";

type PageProps = {
  response: TBaseStory[];
};

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "48px",

  "@tablet": {
    marginTop: "24px",
  },

  "@phone": {
    marginTop: "16px",
  },
});

const Home: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  return (
    <Fragment>
      <Head>
        <title>hckrnws - Cleaner Reading</title>
      </Head>
      <Box>
        {response.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </Box>
    </Fragment>
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
