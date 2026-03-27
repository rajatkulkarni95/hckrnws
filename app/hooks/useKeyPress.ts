import { useEffect, useState } from "react";

interface IKey {
  key: string;
}

export function useKeyPress(
  targetKey: string,
  handlePress: () => void
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: IKey): void {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: IKey): void => {
    if (key === targetKey) {
      setKeyPressed(false);
      handlePress();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}
