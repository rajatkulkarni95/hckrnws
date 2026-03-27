import { RefObject, useEffect, useRef, useState } from "react";

export function useHover<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  });

  return [ref, value];
}
