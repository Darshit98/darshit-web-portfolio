import { motion, MotionProps, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { scrollReveal, getReducedMotionVariants } from "@/lib/animations";

interface ScrollRevealProps extends Omit<MotionProps, "variants"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
}

const directionVariants: Record<
  NonNullable<ScrollRevealProps["direction"]>,
  Variants
> = {
  up: scrollReveal,
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
      },
    },
  },
  left: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
      },
    },
  },
  right: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
      },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
      },
    },
  },
};

export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className,
  ...props
}: ScrollRevealProps) => {
  const variants = directionVariants[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getReducedMotionVariants(variants)}
      transition={{ delay, duration, ease: [0, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
