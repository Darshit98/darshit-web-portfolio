import Lenis from "lenis";
import { createContext } from "react";

export type ScrollTarget = string | number | HTMLElement;

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, offset?: number) => void;
}

export const SmoothScrollContext =
  createContext<SmoothScrollContextValue | null>(null);
