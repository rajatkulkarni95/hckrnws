import { getLocalStorage, setLocalStorage } from "~/helpers/localstorage";
import { TBaseStory } from "~/types/story";
import { SliceStateCreator } from "./useStore";

export interface StarSlice {
  starred: TBaseStory[] | [];
  starStory: (starred: TBaseStory[]) => void;
}

const createStarSlice: SliceStateCreator<StarSlice> = (
  set,
  get,
  api
): StarSlice => ({
  starred: getLocalStorage("starred", []),
  starStory: (starred) =>
    set((state) => {
      setLocalStorage("starred", starred);
      return { starred };
    }),
});

export default createStarSlice;
