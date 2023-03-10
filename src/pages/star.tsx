import { NextPage } from "next";
import { TBaseStory } from "~/types/story";
import StoryListItem from "~/components/StoryListItem";
import Head from "next/head";
import { Fragment } from "react";
import useStore from "~/store/useStore";
import dynamic from "next/dynamic";

type PageProps = {
  response: TBaseStory[];
};

const Star: NextPage<PageProps> = () => {
  const starred = useStore((state) => state.starred);
  return (
    <Fragment>
      <Head>
        <title>Starred</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h3 className="text-lg mt-4 text-secondary font-medium">
        You starred <span className="text-amber-400">{starred?.length}</span>{" "}
        stories
      </h3>
      <div className="flex flex-col mt-8">
        {starred?.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
      </div>
    </Fragment>
  );
};

export default dynamic(() => Promise.resolve(Star), {
  ssr: false,
});
