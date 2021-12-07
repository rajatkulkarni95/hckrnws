import { NextPage } from "next";
import { TBaseStory } from "types/story";
import { styled } from "../../../stitches.config";
import StoryListItem from "@components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageNumber } from "@components/Common/PageNumber";

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

const PaginationContainer = styled("div", {
  margin: "16px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@phone": {
    flexWrap: "wrap",
  },
});

const PageList: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  const router = useRouter();
  const { number } = router.query;

  return (
    <Fragment>
      <Head>
        <title>hckrnws - Page {number} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box>
        {response.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </Box>
      <PaginationContainer>
        {[...Array(10)].map((x, i) => (
          <Link key={i + 1} href={`/page/${i + 1}`} passHref>
            <PageNumber selected={(i + 1).toString() === number}>
              {i + 1}
            </PageNumber>
          </Link>
        ))}
      </PaginationContainer>
    </Fragment>
  );
};

export async function getStaticProps(props: { params: { number: string } }) {
  const {
    params: { number },
  } = props;
  const NEWS_BASE_URL = "https://api.hnpwa.com/v0/news";

  const result = await fetch(`${NEWS_BASE_URL}/${number}.json`);
  const response = await result.json();

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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { number: "1" } },
      { params: { number: "2" } },
      { params: { number: "3" } },
      { params: { number: "4" } },
      { params: { number: "5" } },
      { params: { number: "6" } },
      { params: { number: "7" } },
      { params: { number: "8" } },
      { params: { number: "9" } },
      { params: { number: "10" } },
    ],
    fallback: false,
  };
}

export default PageList;
