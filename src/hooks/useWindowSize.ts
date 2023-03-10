import { useEffect, useState } from "react";
import { Size } from "~/types/size";

const useWindowSize = () => {
  const [windowsSize, setWindowSize] = useState<Size>({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowsSize;
};

export default useWindowSize;
