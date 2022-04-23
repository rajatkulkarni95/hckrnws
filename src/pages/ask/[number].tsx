import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "types/story";
import StoryListItem from "@components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageNumber } from "@components/Common/PageNumber";
import { CenteredText } from "styles/";
import { PageBox, PaginationContainer } from "@components/List";

const AskStoriesList: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { number } = router.query;
  const { data, errorCode } = props;

  if (errorCode)
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  if (!data) return <CenteredText>Loading...</CenteredText>;

  return (
    <Fragment>
      <Head>
        <title>hckrnws - Ask - {number} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PageBox>
        {data.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </PageBox>
      <PaginationContainer>
        {[...Array(10)].map((x, i) => (
          <Link key={i + 1} href={`/ask/${i + 1}`} passHref>
            <PageNumber selected={(i + 1).toString() === number}>
              {i + 1}
            </PageNumber>
          </Link>
        ))}
      </PaginationContainer>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { number } = context.query;

  const ASK_BASE_URL = "https://api.hnpwa.com/v0/ask";
  // Due to the redirect being made from / to /page/1 , the number sometimes is undefined when it reaches the fetch
  // Setting it to 1, avoids the undefined api call
  const fetchUrl = number
    ? `${ASK_BASE_URL}/${number}.json`
    : `${ASK_BASE_URL}/1.json`;

  const response = await fetch(fetchUrl);
  const errorCode = response.ok ? false : response.status;
  // Only run the json if the error is not present
  const data = errorCode === false ? await response.json() : [];

  return {
    props: {
      errorCode,
      data,
    },
  };
};

export default AskStoriesList;
