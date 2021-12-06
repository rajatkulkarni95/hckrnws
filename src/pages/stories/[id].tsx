import { NextPage } from "next";
import { FlexColumn } from "../../styles";

import { useRouter } from "next/router";
import { TDetailedStory } from "types/story";
import { Fragment } from "react";
import Head from "next/head";
import { styled } from "../../../stitches.config";
import Meta from "@components/Common/Meta";

type PageProps = {
  response: TDetailedStory;
};

const Title = styled("h2", {
  fontSize: "$4",
  color: "$primaryText",
  margin: 0,
  marginBottom: "8px",
});

const Content = styled("p", {
  fontSize: "$2",
  color: "$secondaryText",
  marginBottom: "8px",
});

const Story: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const {
    response: { title, id, points, user, time, content, comments },
  } = props;

  return (
    <Fragment>
      <Head>
        <title>{title} - hckrnws</title>
      </Head>
      <FlexColumn css={{ padding: "16px 0", "@phone": { padding: "16px" } }}>
        <Title>{title}</Title>
        <Content></Content>
        <Meta
          time={time}
          points={points}
          user={user}
          isDetailedView
          comments={comments.length}
        />
      </FlexColumn>
    </Fragment>
  );
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
