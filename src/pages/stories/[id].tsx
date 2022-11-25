import { GetServerSideProps, NextPage } from "next";
import { CenteredText, FlexColumn } from "../../styles";

import { useRouter } from "next/router";
import { TDetailedStory } from "types/story";
import { Fragment } from "react";
import Head from "next/head";
import { styled } from "../../../stitches.config";
import Meta from "@components/Common/Meta";
import CommentList from "@components/Comments/CommentList";
import { Button } from "@components/Common/Button";
import BackIcon from "svgs/back.svg";
import { useTheme } from "next-themes";
import InnerHTMLText from "@components/Common/InnerHTMLText";
import { Size } from "types/size";
import useWindowSize from "hooks/useWindowSize";
import useStore from "store/useStore";
import { decode } from "html-entities";

type Props = {
  data: TDetailedStory;
  errorCode: false | number;
};

const Title = styled("h2", {
  fontSize: "$4",
  color: "$primaryText",
  margin: 0,
  marginBottom: "8px",

  "@phone": {
    fontSize: "$3",
  },
});

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
});

const Story: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { data, errorCode } = props;

  const size: Size = useWindowSize();

  const starStory = useStore((state) => state.starStory);
  const starred = useStore((state) => state.starred);

  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";

  if (errorCode)
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  if (!data) return <CenteredText>Loading...</CenteredText>;

  const { title, id, points, user, time, content, comments, domain } = data;
  let { url } = data;

  const onClickBack = () => router.back();

  // If url links to a hackernews story, remove the params, so that it can route inside hckrnws
  if (url.startsWith("item?id=")) {
    url = url.replace("item?id=", "");
  }

  // Assigning a number greater than the compared value, so that it defaults to false
  const isMobile = (size?.width ?? 641) < 640;

  const story = {
    id,
    title,
    points,
    user,
    time,
    url,
    domain,
    comments_count: comments.length,
  };

  const handleStar = () => {
    // save them to the zustand store, which in turn will save to local storage
    const isStoryStarred = starred?.some((story) => story.id === id);
    if (isStoryStarred) {
      const filteredStories = starred?.filter((story) => story.id !== id);
      starStory(filteredStories);
    } else {
      starStory([...starred, story]);
    }
  };

  const isStoryStarred: boolean = starred?.some((story) => story.id === id);

  return (
    <Fragment>
      <Head>
        <title>{decode(title)} - hckrnws</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <FlexColumn css={{ padding: "16px 0" }}>
        <Button
          css={{ width: "48px", marginBottom: "16px" }}
          onClick={onClickBack}
        >
          <BackIcon width={14} height={14} stroke={stroke} />
        </Button>
        <Title>
          {decode(title)} {isMobile && domain && <Text>({domain})</Text>}
        </Title>

        <InnerHTMLText dangerouslySetInnerHTML={{ __html: content }} />
        <Meta
          time={time}
          points={points}
          user={user}
          isDetailedView
          comments={comments.length}
          url={url}
          domain={domain}
          handleStarring={handleStar}
          isStoryStarred={isStoryStarred}
        />
        <CommentList comments={comments} op={user} />
      </FlexColumn>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const ITEM_BASE_URL = "https://api.hnpwa.com/v0/item";

  const fetchUrl = `${ITEM_BASE_URL}/${id}.json`;

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

export default Story;
