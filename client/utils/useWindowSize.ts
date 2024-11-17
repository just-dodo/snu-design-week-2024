import { useEffect, useState } from "react";

const _useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const isMobileView = windowSize.width < 1194;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);

  return { windowSize, isMobileView };
};

export default _useWindowSize;