import { Variants } from "framer-motion";

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Common easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: [0.68, -0.55, 0.265, 1.55],
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOut,
    },
  },
};

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Hover variants
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: -8,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

export const hoverGlow: Variants = {
  rest: { boxShadow: "0 0 0 rgba(96,165,250,0)" },
  hover: {
    boxShadow: "0 0 20px rgba(96,165,250,0.5)",
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

// 3D tilt effect
export const tilt3D: Variants = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: 5,
    rotateY: -5,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

// Magnetic hover effect
export const magnetic: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Text reveal variants
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// Icon animations
export const iconRotate: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const iconPulse: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// Button animations
export const buttonPress: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Scroll reveal variants
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

// Parallax variants
export const parallaxUp: Variants = {
  rest: { y: 0 },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

export const parallaxDown: Variants = {
  rest: { y: 0 },
  hover: {
    y: 10,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

// Border morph animation
export const borderMorph: Variants = {
  rest: {
    borderRadius: "0.5rem",
  },
  hover: {
    borderRadius: "1rem",
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    },
  },
};

// Get reduced motion variants
export const getReducedMotionVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return variants;
};

export interface ScrollScenePreset {
  backgroundFar: [number, number];
  backgroundNear: [number, number];
  contentY: [number, number];
  contentScale: [number, number];
  contentOpacity: [number, number];
  ambientY: [number, number];
  ambientOpacity: [number, number];
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

export const createBalancedScrollScene = (intensity = 1): ScrollScenePreset => {
  const safeIntensity = Math.min(1.2, Math.max(0.4, intensity));

  return {
    backgroundFar: [0, 26 * safeIntensity],
    backgroundNear: [0, 44 * safeIntensity],
    contentY: [0, -120 * safeIntensity],
    contentScale: [1, 1 - 0.06 * safeIntensity],
    contentOpacity: [1, Math.max(0.18, 1 - 0.86 * safeIntensity)],
    ambientY: [0, -70 * safeIntensity],
    ambientOpacity: [0.55, 0],
  };
};

export const createReducedMotionScene = (): ScrollScenePreset => ({
  backgroundFar: [0, 0],
  backgroundNear: [0, 0],
  contentY: [0, 0],
  contentScale: [1, 1],
  contentOpacity: [1, 1],
  ambientY: [0, 0],
  ambientOpacity: [0.15, 0.15],
});

export const getSectionFocusRange = (
  index: number,
  total: number,
  spread = 0.2
): [number, number, number] => {
  const safeTotal = Math.max(1, total);
  const center = clampProgress((index + 0.5) / safeTotal);
  const safeSpread = Math.min(0.35, Math.max(0.08, spread));

  return [
    clampProgress(center - safeSpread),
    center,
    clampProgress(center + safeSpread),
  ];
};
