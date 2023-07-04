import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PageProps } from "~/types/story";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { CenteredText } from "~/components/Common/Fragments";
import StoryList from "~/components/StoryList";

const AskStoriesList: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { number } = router.query;
  const { data, errorCode } = props;

  if (errorCode)
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  if (!data) return <CenteredText>Loading...</CenteredText>;

  const handlePageChange = (page: number) => {
    router.push(`/ask/${page}`);
  };

  return (
    <Fragment>
      <Head>
        <title>Ask HN - Page {number}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StoryList
        data={data}
        handlePageChange={handlePageChange}
        number={number}
        key={`ask-${number}`}
      />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const number = params?.number || 1;

  const BASE_URL = "https://api.hnpwa.com/v0/ask";
  const fetchUrl = `${BASE_URL}/${number}.json`;

  const response = await fetch(fetchUrl);
  const errorCode = response.ok ? false : response.status;
  // Only run the json if the error is not present
  const data = errorCode === false ? await response.json() : [];

  return {
    props: {
      errorCode,
      data,
    },

    revalidate: 3600, // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const paths = [...Array(2)].map((x, idx) => ({
    params: { number: (idx + 1).toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default AskStoriesList;
