import { useState } from "react";

export const useVirtualScroll = (items: any[], rowHeight = 60) => {
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = 500; // visible height
  const totalHeight = items.length * rowHeight;

  const startIndex = Math.floor(scrollTop / rowHeight);
  const visibleCount = Math.ceil(containerHeight / rowHeight);

  const visibleItems = items.slice(
    startIndex,
    startIndex + visibleCount + 5
  );

  return {
    totalHeight,
    visibleItems,
    offsetY: startIndex * rowHeight,
    setScrollTop,
  };
};