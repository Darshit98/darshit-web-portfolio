import { useContext } from "react";
import { SmoothScrollContext, type ScrollTarget } from "@/lib/smoothScroll";

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);

  if (context) {
    return context;
  }

  return {
    lenis: null,
    scrollTo: (target: ScrollTarget, offset = -80) => {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }

      if (typeof target === "string") {
        const element = document.querySelector(target);
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
  };
};
