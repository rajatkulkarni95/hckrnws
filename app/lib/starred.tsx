import { createContext, useCallback, useContext, useState, useEffect } from "react";
import type { TBaseStory } from "~/types/story";

const STORAGE_KEY = "starred";

function readStarred(): TBaseStory[] {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

interface StarredContextValue {
  starred: TBaseStory[];
  toggleStar: (story: TBaseStory) => void;
  isStarred: (id: number) => boolean;
}

const StarredContext = createContext<StarredContextValue>(null!);

export function StarredProvider({ children }: { children: React.ReactNode }) {
  const [starred, setStarred] = useState<TBaseStory[]>(() => readStarred());

  const toggleStar = useCallback((story: TBaseStory) => {
    setStarred((prev) => {
      const exists = prev.some((s) => s.id === story.id);
      const next = exists
        ? prev.filter((s) => s.id !== story.id)
        : [...prev, story];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isStarred = useCallback(
    (id: number) => starred.some((s) => s.id === id),
    [starred]
  );

  return (
    <StarredContext.Provider value={{ starred, toggleStar, isStarred }}>
      {children}
    </StarredContext.Provider>
  );
}

export function useStarred() {
  return useContext(StarredContext);
}
