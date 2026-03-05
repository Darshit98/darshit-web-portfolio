import { Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import ResumeRequestDialog from "./ResumeRequestDialog";
import backgroundImage from "../images/background-image.png";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { staggerContainer, textReveal } from "@/lib/animations";
// import ChatWidget from './ChatWidget';

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "ref"> & {
  href: string;
  children: React.ReactNode;
};

const MagneticButton = ({ children, href, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const typedRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["AI/ML Engineering", "Data Engineering", "Data Analysis"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative pt-32 min-h-screen flex items-center bg-gradient-to-br from-background to-muted overflow-hidden"
      style={{ opacity }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: backgroundY,
          scale: 1.1,
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-background/30 z-0" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-3xl space-y-8 px-4 sm:px-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-4" variants={staggerContainer}>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#ff8c00]"
              variants={textReveal}
            >
              Pioneering the Future with AI and Data
            </motion.h3>
            <motion.h1
              className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary to-[#ff8c00] bg-clip-text text-transparent"
              variants={textReveal}
            >
              I'm Darshit Shah
            </motion.h1>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#ff8c00]"
              variants={textReveal}
            >
              Skilled and Experienced in <span ref={typedRef}></span>
            </motion.h3>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            variants={textReveal}
          >
            As a Data Engineer and AI Enthusiast, I specialize in leveraging Generative AI, 
            Large Language Models (LLMs), and advanced data visualization techniques to turn 
            data into powerful insights. Join me in transforming the ordinary into the extraordinary.
          </motion.p>

          <motion.div
            className="flex gap-6"
            variants={staggerContainer}
          >
            <MagneticButton
              href="https://www.linkedin.com/in/darshit131998/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 
                       border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white 
                       transition-colors duration-300 hover:shadow-lg"
            >
              <Linkedin className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton
              href="https://github.com/darshit98"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 
                       border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white 
                       transition-colors duration-300 hover:shadow-lg"
            >
              <Github className="w-5 h-5" />
            </MagneticButton>
          </motion.div>

          <motion.div
            className="pt-4"
            variants={textReveal}
          >
            <ResumeRequestDialog />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-[#ff8c00] rounded-full flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-[#ff8c00] rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      {/* <ChatWidget /> */}
    </motion.section>
  );
};

export default Hero;