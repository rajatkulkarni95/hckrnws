import { NextPage } from "next";
import { TBaseStory } from "types/story";
import { styled } from "../../../stitches.config";
import StoryListItem from "@components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageNumber } from "@components/Common/PageNumber";
import useSWR from "swr";
import fetcher from "helpers/fetcher";
import { CenteredText } from "styles/";

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
  const router = useRouter();
  const { number } = router.query;

  const NEWS_BASE_URL = "https://api.hnpwa.com/v0/news";

  const { data, error } = useSWR<TBaseStory[], Error>(
    `${NEWS_BASE_URL}/${number}.json`,
    fetcher
  );

  if (!data) return <CenteredText>Loading...</CenteredText>;

  if (error) return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  return (
    <Fragment>
      <Head>
        <title>hckrnws - Page {number} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box>
        {data.map((story) => (
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

export default PageList;
