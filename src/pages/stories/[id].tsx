import { NextPage } from "next";
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
import useSWR from "swr";
import fetcher from "helpers/fetcher";
import { useTheme } from "next-themes";
import InnerHTMLText from "@components/Common/InnerHTMLText";
import { Size } from "types/size";
import useWindowSize from "hooks/useWindowSize";

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

const Story: NextPage = () => {
  const router = useRouter();
  const { id: storyId } = router.query;

  const size: Size = useWindowSize();

  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";

  const ITEM_BASE_URL = "https://api.hnpwa.com/v0/item";

  const { data, error } = useSWR<TDetailedStory, Error>(
    `${ITEM_BASE_URL}/${storyId}.json`,
    fetcher
  );

  if (error) return <CenteredText>Oops! Something went wrong :(</CenteredText>;

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

  return (
    <Fragment>
      <Head>
        <title>{title} - hckrnws</title>
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
          {title} {isMobile && <Text>({domain})</Text>}
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
        />
        <CommentList comments={comments} op={user} />
      </FlexColumn>
    </Fragment>
  );
};

export default Story;
