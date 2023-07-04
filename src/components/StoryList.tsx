import { TBaseStory } from "~/types/story";
import Pagination from "./Common/Pagination";
import StoryListItem from "./StoryListItem";
import { useHotkeys } from "react-hotkeys-hook";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

type TStoryList = {
  data: TBaseStory[];
  number: string | string[] | undefined;
  handlePageChange: (page: number) => void;
  view: "new" | "top" | "ask" | "show";
  totalPages: number;
};

const StoryList = ({
  data,
  number,
  handlePageChange,
  view,
  totalPages,
}: TStoryList) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const moveSelectedIndex = (direction: number) => {
    const newIndex = selectedIndex + direction;
    if (newIndex < 0 || newIndex > data.length - 1) return;

    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const selectedElement = document.querySelector(".activeElement");
    if (!selectedElement) return;

    selectedElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [selectedIndex]);

  const currentPage = parseInt(number as string);

  useHotkeys("ArrowUp", () => moveSelectedIndex(-1), {
    preventDefault: selectedIndex !== 0,
  });
  useHotkeys("ArrowDown", () => moveSelectedIndex(1), {
    preventDefault: selectedIndex !== data.length - 1,
  });

  useHotkeys("q", () => {
    if (currentPage === 1) return;
    router.push(`/${view}/${currentPage - 1}`);
  });

  useHotkeys("e", () => {
    if (currentPage === totalPages) return;
    router.push(`/${view}/${currentPage + 1}`);
  });

  return (
    <div className="flex-1" ref={containerRef}>
      {data.map((story, i) => (
        <StoryListItem
          story={story}
          key={story.id}
          selected={selectedIndex === i}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        onChangePage={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default StoryList;
