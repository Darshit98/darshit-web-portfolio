import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
      style={{
        scaleX: scrollProgress / 100,
        willChange: "transform",
      }}
      initial={{ scaleX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    />
  );
};
