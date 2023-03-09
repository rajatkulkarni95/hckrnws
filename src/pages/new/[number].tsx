import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "~/types/story";
import StoryListItem from "~/components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Pagination from "~/components/Common/Pagination";

const NewStoriesList: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { number } = router.query;
  const { data, errorCode } = props;

  // if (errorCode)
  //   return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  // if (!data) return <CenteredText>Loading...</CenteredText>;

  const handlePageChange = (page: number) => {
    router.push(`/new/${page}`);
  };

  return (
    <Fragment>
      <Head>
        <title>New HN - Page {number}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {data.map((story) => (
        <StoryListItem story={story} key={story.id} />
      ))}
      <Pagination
        currentPage={parseInt(number as string)}
        onChangePage={handlePageChange}
      />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { number } = context.query;

  const NEW_BASE_URL = "https://api.hnpwa.com/v0/newest";
  // Due to the redirect being made from / to /page/1 , the number sometimes is undefined when it reaches the fetch
  // Setting it to 1, avoids the undefined api call
  const fetchUrl = number
    ? `${NEW_BASE_URL}/${number}.json`
    : `${NEW_BASE_URL}/1.json`;

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

export default NewStoriesList;
