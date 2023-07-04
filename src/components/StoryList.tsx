import { TBaseStory } from "~/types/story";
import Pagination from "./Common/Pagination";
import StoryListItem from "./StoryListItem";
import { useHotkeys } from "react-hotkeys-hook";
import { useEffect, useRef, useState } from "react";

type TStoryList = {
  data: TBaseStory[];
  number: string | string[] | undefined;
  handlePageChange: (page: number) => void;
};

const StoryList = ({ data, number, handlePageChange }: TStoryList) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useHotkeys("ArrowUp", () => moveSelectedIndex(-1), {
    preventDefault: true,
  });
  useHotkeys("ArrowDown", () => moveSelectedIndex(1), {
    preventDefault: true,
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
        currentPage={parseInt(number as string)}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default StoryList;
