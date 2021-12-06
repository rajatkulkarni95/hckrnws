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
});

const PageList: NextPage<PageProps> = (props: PageProps) => {
  const { response } = props;
  const router = useRouter();
  const { number } = router.query;

  return (
    <Fragment>
      <Head>
        <title>hckrnws - Page ${number} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box>
        {response.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </Box>
      <PaginationContainer>
        {[...Array(10)].map((x, i) => (
          <Link href={`/page/${i + 1}`} passHref>
            <PageNumber selected={(i + 1).toString() === number}>
              {i + 1}
            </PageNumber>
          </Link>
        ))}
      </PaginationContainer>
    </Fragment>
  );
};

export async function getServerSideProps(context: {
  query: { number: number };
}) {
  const { number } = context.query;
  const domainUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_DOMAIN_URL;
  const res = await fetch(`${domainUrl}/api/page/${number}`);
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

export default PageList;
