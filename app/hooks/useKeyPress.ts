import { useEffect, useRef } from "react";

function isEditableTarget() {
  const el = document.activeElement;
  if (!el) return false;
  const tag = (el as HTMLElement).tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function useKeyPress(
  targetKey: string,
  handlePress: () => void
): void {
  const callbackRef = useRef(handlePress);
  callbackRef.current = handlePress;

  useEffect(() => {
    function handler(e: KeyboardEvent): void {
      if (e.key === targetKey && !isEditableTarget()) {
        callbackRef.current();
      }
    }

    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  }, [targetKey]);
}
