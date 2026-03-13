import Lenis from "lenis";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SmoothScrollContext, type ScrollTarget } from "@/lib/smoothScroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
  enabled: boolean;
}

export const SmoothScrollProvider = ({
  children,
  enabled,
}: SmoothScrollProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";

    if (!enabled) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setLenis(null);
      return;
    }

    const lenisInstance = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.85,
      syncTouch: false,
    });

    setLenis(lenisInstance);

    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  const scrollTo = useCallback(
    (target: ScrollTarget, offset = -80) => {
      if (lenis) {
        lenis.scrollTo(target, { offset });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({
          top: target,
          behavior: "smooth",
        });
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
    [lenis]
  );

  const value = useMemo(
    () => ({
      lenis,
      scrollTo,
    }),
    [lenis, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
