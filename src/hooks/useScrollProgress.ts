import { useEffect, useState } from "react";

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (winHeightPx <= 0) {
        setScrollProgress(0);
        return;
      }

      const scrolled = (scrollPx / winHeightPx) * 100;
      const clampedProgress = Math.min(100, Math.max(0, scrolled));
      setScrollProgress(clampedProgress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return scrollProgress;
};
