import { useScroll, useTransform, MotionValue } from "framer-motion";

export const useParallax = (
  value: MotionValue<number>,
  distance: number
) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export const useParallaxValue = (distance: number = 50) => {
  const { scrollYProgress } = useScroll();
  return useParallax(scrollYProgress, distance);
};
