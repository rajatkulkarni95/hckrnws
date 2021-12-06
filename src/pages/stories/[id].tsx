import { NextPage } from "next";
import { Container } from "../../styles";

import { useRouter } from "next/router";
import { TDetailedStory } from "types/story";
import { Fragment } from "react";

type PageProps = {
  response: TDetailedStory[];
};

const Story: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { response } = props;
  return <Fragment>Hello from Story {id}</Fragment>;
};

export async function getServerSideProps(context: { query: { id: number } }) {
  const { id } = context.query;

  const domainUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_DOMAIN_URL;
  const res = await fetch(`${domainUrl}/api/stories/${id}`);
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

export default Story;
