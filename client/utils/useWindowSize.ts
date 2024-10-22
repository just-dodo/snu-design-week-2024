import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const _useWindowSize = () => {
  const windowSize = useWindowSize();

  const isMobileView = windowSize.width < 1194;

  return { windowSize, isMobileView };
};

export default _useWindowSize;
