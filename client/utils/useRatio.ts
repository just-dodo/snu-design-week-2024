import { useEffect, useState } from "react";

export const useRatio = () => {
  const [ratio, setRatio] = useState({
    width: 0,
    height: 0,
  });

  const webPivotWidth = 1600;
  const webPivotHeight = 900;

  const mobilePivotWidth = 393;
  const mobilePivotHeight = 852;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setRatio({
          width: window.innerWidth > 1194 ? window.innerWidth / webPivotWidth : window.innerWidth / mobilePivotWidth,
          height: window.innerWidth > 768 ? window.innerHeight / webPivotHeight : window.innerHeight / mobilePivotHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);
  return ratio;
};