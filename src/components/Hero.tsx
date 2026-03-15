import { Github, Linkedin } from "lucide-react";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import Typed from "typed.js";
import ResumeRequestDialog from "./ResumeRequestDialog";
import backgroundImage from "../images/background-image.png";
import {
  motion,
  type HTMLMotionProps,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  createBalancedScrollScene,
  createReducedMotionScene,
  staggerContainer,
  textReveal,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "ref"> & {
  href: string;
  children: ReactNode;
};

const HERO_BLOBS = [
  {
    left: "-12%",
    top: "8%",
    size: "h-72 w-72",
    tone: "bg-[#38bdf8]/35",
    x: [0, 80, -30, 0],
    y: [0, -50, 35, 0],
    duration: 20,
  },
  {
    left: "68%",
    top: "15%",
    size: "h-80 w-80",
    tone: "bg-[#fb7185]/25",
    x: [0, -60, 50, 0],
    y: [0, 55, -30, 0],
    duration: 24,
  },
  {
    left: "32%",
    top: "68%",
    size: "h-64 w-64",
    tone: "bg-[#a78bfa]/25",
    x: [0, 50, -40, 0],
    y: [0, -35, 20, 0],
    duration: 18,
  },
];

const HERO_PARTICLES = [
  { left: "8%", top: "22%", delay: 0, duration: 7 },
  { left: "18%", top: "62%", delay: 0.5, duration: 8.5 },
  { left: "29%", top: "36%", delay: 1.2, duration: 7.2 },
  { left: "48%", top: "18%", delay: 0.9, duration: 8.2 },
  { left: "57%", top: "56%", delay: 1.7, duration: 7.6 },
  { left: "72%", top: "34%", delay: 0.2, duration: 8.7 },
  { left: "84%", top: "68%", delay: 1.1, duration: 7.9 },
  { left: "92%", top: "26%", delay: 1.9, duration: 8.4 },
];

const MagneticButton = ({ children, href, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

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
  const typedRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scene = prefersReducedMotion
    ? createReducedMotionScene()
    : createBalancedScrollScene(1.1);

  const backgroundFarY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${scene.backgroundFar[0]}%`, `${scene.backgroundFar[1]}%`]
  );
  const backgroundNearY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${scene.backgroundNear[0]}%`, `${scene.backgroundNear[1]}%`]
  );
  const contentY = useTransform(scrollYProgress, [0, 1], scene.contentY);
  const contentScale = useTransform(scrollYProgress, [0, 1], scene.contentScale);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], scene.contentOpacity);
  const ambientY = useTransform(scrollYProgress, [0, 1], scene.ambientY);
  const ambientOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    scene.ambientOpacity
  );

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: ["AI/ML Engineering", "Data Engineering", "Data Analysis"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative pt-32 min-h-screen flex items-center bg-gradient-to-br from-background to-muted overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: backgroundFarY,
          scale: 1.18,
          opacity: 0.45,
          filter: "blur(1px)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: backgroundNearY,
          scale: 1.08,
          opacity: 0.82,
          willChange: "transform, opacity",
        }}
      />

      {!prefersReducedMotion && (
        <>
          {HERO_BLOBS.map((blob, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full blur-3xl z-0 ${blob.size} ${blob.tone}`}
              style={{ left: blob.left, top: blob.top }}
              animate={{
                x: blob.x,
                y: blob.y,
                scale: [1, 1.15, 0.92, 1],
                opacity: [0.22, 0.5, 0.24],
              }}
              transition={{
                duration: blob.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {HERO_PARTICLES.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute z-0 h-1.5 w-1.5 rounded-full bg-white/60"
              style={{ left: particle.left, top: particle.top }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
            animate={{ x: ["0%", "420%"] }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <motion.div
        className="absolute -right-20 top-28 h-72 w-72 rounded-full bg-[#ff8c00]/25 blur-3xl z-0"
        style={{ y: ambientY, opacity: ambientOpacity }}
      />
      <motion.div
        className="absolute -left-24 bottom-14 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl z-0"
        style={{ y: ambientY, opacity: ambientOpacity }}
      />

      <div className="absolute inset-0 z-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 bg-background/34 z-0" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-3xl space-y-8 px-4 sm:px-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            willChange: "transform, opacity",
          }}
        >
          <motion.div className="space-y-4" variants={staggerContainer}>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#ff8c00]"
              variants={textReveal}
            >
              Pioneering the Future with AI and Data
            </motion.h3>
            <motion.h1
              className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-[#1d4ed8] to-[#ff8c00] bg-clip-text text-transparent"
              variants={textReveal}
            >
              I'm Darshit Shah
            </motion.h1>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#ff8c00]"
              variants={textReveal}
            >
              Skilled and Experienced in <span ref={typedRef} />
            </motion.h3>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            variants={textReveal}
          >
            As a Data Engineer and AI Enthusiast, I specialize in leveraging
            Generative AI, Large Language Models (LLMs), and advanced data
            visualization techniques to turn data into powerful insights. Join me
            in transforming the ordinary into the extraordinary.
          </motion.p>

          <motion.div className="flex gap-6" variants={staggerContainer}>
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

          <motion.div className="pt-4" variants={textReveal}>
            <ResumeRequestDialog />
          </motion.div>
        </motion.div>
      </div>

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
    </motion.section>
  );
};

export default Hero;
