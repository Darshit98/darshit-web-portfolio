import { motion, MotionProps, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps extends Omit<MotionProps, "style"> {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export const ParallaxSection = ({
  children,
  speed = 0.5,
  direction = "up",
  className,
  ...props
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [0, -100 * speed] : [0, 100 * speed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
