import { NextPage } from "next";
import { TBaseStory } from "types/story";
import StoryListItem from "@components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import { styled } from "../../stitches.config";
import useStore from "store/useStore";

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

const Title = styled("h2", {
  margin: "16px 8px",
  fontSize: "$4",
  color: "$primaryText",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
  color: "$primaryText",
  fontFamily: "$system",
});

const Star: NextPage<PageProps> = (props: PageProps) => {
  const starred = useStore((state) => state.starred);
  return (
    <Fragment>
      <Head>
        <title>Starred - hckrnws </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Title>
        Your Stars <Text>{starred?.length} stories</Text>
      </Title>
      <Box>
        {starred?.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </Box>
    </Fragment>
  );
};

export default Star;
