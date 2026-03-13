import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import northeasternLogo from "../images/Northeastern_University.jpg";
import founderwayLogo from "../images/Founderway.jpg";
import ltiLogo from "../images/LTIMindtree.jpg";
import rivianLogo from "../images/Rivian.png";
import { Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo: string;
}

const experiences: ExperienceEntry[] = [
  {
    company: "Rivian Automotive",
    role: "AI Technical Lead",
    period: "April 2025 - Present",
    description: [
      "Driving AI-led technical direction and production delivery across strategic initiatives.",
      "Owning architecture decisions and implementation quality for scalable AI systems.",
    ],
    logo: rivianLogo,
  },
  {
    company: "Northeastern University",
    role: "Graduate Teaching Assistant - Generative AI with LLM in Data",
    period: "September 2024 - December 2024",
    description: [
      "Led classroom activities and provided comprehensive support through regular TA hours, facilitating effective learning for 30+ graduate students in Generative AI",
      "Mentored student project teams from ideation to implementation, resulting in successful completion of 10+ innovative AI applications",
    ],
    logo: northeasternLogo,
  },
  {
    company: "FounderWay",
    role: "AI Engineer",
    period: "January 2024 - June 2024",
    description: [
      "Developed RAG system using Azure OpenAI, implementing parallel processing to reduce document processing time by 45% while handling 100K+ daily queries",
      "Built scalable chatbot architecture integrating Azure AI Search with completion API, achieving 30% better response accuracy through algorithm optimization and caching strategies",
      "Applied deep learning techniques for natural language processing, improving query understanding by 25%",
      "Led 4-engineer team establishing AI monitoring practices and validation pipelines with responsible AI practices",
      "Resolved CORS security issues in server-side configuration through Microsoft collaboration for secure cross-origin sharing",
      "Engineered BERT-based custom matching algorithm increasing user satisfaction by 35%",
    ],
    logo: founderwayLogo,
  },
  {
    company: "Northeastern University",
    role: "Graduate Teaching Assistant - Application Engineering Development",
    period: "September 2023 - December 2023",
    description: [
      "Mentoring students on software development best practices, including version control, unit testing, code review, and validation, to help them build robust and maintainable Java Swing applications",
      "Supported students individually and in groups, fostering their problem-solving skills and providing constructive feedback to promote their growth and proficiency in Java Swing application development",
    ],
    logo: northeasternLogo,
  },
  {
    company: "LTI - Larsen & Toubro Infotech",
    role: "Senior Quality Engineer",
    period: "June 2019 - July 2022",
    description: [
      "Led the UBS team to launch a real-time banking data validation system using Kafka and Splunk, improving data accuracy by 10% and reducing processing time by 40 seconds, through optimized SQL scripts",
      "Built Python-Airflow monitoring framework with custom alerts for 20+ applications, reducing incidents by 45%",
      "Accelerated transformation speed by 30% by automating security data processes using Airflow ETL pipelines",
      "Automated 3 million rows of account data with 5 DAGs, cutting costs by 20% and achieving quicker insights",
      "Developed comprehensive Tableau dashboards for real-time transaction monitoring, analyzing 1M+ daily transactions using complex SQL queries, resulting in 25% faster fraud detection and reporting",
    ],
    logo: ltiLogo,
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      experiences.length - 1,
      Math.max(0, Math.floor(latest * experiences.length))
    );

    setActiveCard((current) => {
      if (nextIndex === current) return current;
      setDirection(nextIndex > current ? 1 : -1);
      return nextIndex;
    });
  });

  const stageHeight = useMemo(() => {
    const desktopStoryHeightVh = 160 + (experiences.length - 1) * 45;
    return `${desktopStoryHeightVh}vh`;
  }, []);

  const previousCard = activeCard > 0 ? experiences[activeCard - 1] : null;
  const upcomingCard =
    activeCard < experiences.length - 1 ? experiences[activeCard + 1] : null;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-x-clip bg-gradient-to-br from-[#0b1020] via-[#1b3478] to-[#121a2e] text-white"
    >
      <div className="lg:hidden py-14 px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">
            Professional Journey
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {experiences.map((entry, index) => (
            <motion.div
              key={`${entry.company}-${entry.period}-mobile`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <ExperienceCard entry={entry} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block" style={{ minHeight: stageHeight }}>
        <div className="sticky top-16 h-[88vh] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(56,189,248,0.20),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_42%),radial-gradient(circle_at_50%_82%,rgba(244,114,182,0.14),transparent_45%)]" />
          <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:56px_56px]" />

          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent"
              animate={{ x: ["0%", "430%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          )}

          <div className="relative h-full container mx-auto px-6 xl:px-8 pt-7 md:pt-8 pb-6">
            <div className="text-center mb-4 md:mb-5">
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                Professional Journey
              </h2>
            </div>

            <div className="grid gap-5 xl:gap-7 lg:grid-cols-[minmax(0,1fr)_320px] items-start h-[calc(100%-72px)]">
              <div className="relative h-full min-h-[500px] pt-1">
                {!prefersReducedMotion && previousCard && (
                  <motion.div
                    className="absolute inset-x-4 md:inset-x-10 top-[14%] h-[72%] rounded-[28px] border border-white/12 bg-white/6 backdrop-blur-md"
                    initial={false}
                    animate={{ rotate: -5, scale: 0.94, opacity: 0.2, x: -24 }}
                    transition={{ duration: 0.35 }}
                  />
                )}

                {!prefersReducedMotion && upcomingCard && (
                  <motion.div
                    className="absolute inset-x-4 md:inset-x-10 top-[10%] h-[72%] rounded-[28px] border border-white/12 bg-white/6 backdrop-blur-md"
                    initial={false}
                    animate={{ rotate: 4, scale: 0.93, opacity: 0.14, x: 20 }}
                    transition={{ duration: 0.35 }}
                  />
                )}

                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <motion.div
                    key={activeCard}
                    custom={direction}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: direction > 0 ? 84 : -84,
                            y: 10,
                            rotate: direction > 0 ? 2.5 : -2.5,
                            scale: 0.98,
                          }
                    }
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: direction > 0 ? -72 : 72,
                            y: -8,
                            rotate: direction > 0 ? -2 : 2,
                            scale: 0.97,
                          }
                    }
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0"
                  >
                    <ExperienceCard entry={experiences[activeCard]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="hidden lg:flex flex-col gap-2.5 max-h-[74vh]">
                {experiences.map((entry, index) => {
                  const isActive = index === activeCard;

                  return (
                    <motion.div
                      key={`${entry.company}-${entry.period}`}
                      className={`rounded-xl border px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? "border-cyan-300/70 bg-cyan-300/12"
                          : "border-white/15 bg-white/5"
                      }`}
                      animate={{
                        opacity: isActive ? 1 : 0.62,
                        x: isActive ? 0 : -6,
                        scale: isActive ? 1 : 0.985,
                      }}
                    >
                      <p className="text-xs uppercase tracking-wide text-cyan-200/95">
                        {entry.period}
                      </p>
                      <p className="text-sm text-white font-semibold mt-1">{entry.role}</p>
                      <p className="text-xs text-slate-100/95 mt-0.5">{entry.company}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <Card className="relative mx-auto w-full max-w-[min(100%,68rem)] overflow-hidden rounded-[30px] border border-white/28 bg-[#0a1536]/80 shadow-[0_28px_90px_rgba(2,8,28,0.6)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/12 via-transparent to-fuchsia-200/10" />
      <div className="absolute inset-0 rounded-[30px] border border-cyan-200/25 pointer-events-none" />

      <CardHeader className="relative z-10 px-5 pb-1 pt-5 md:px-6 md:pt-5">
        <div className="flex items-start gap-4 md:gap-5">
          <img
            src={entry.logo}
            alt={entry.company}
            className="h-12 w-12 md:h-14 md:w-14 rounded-xl object-cover border-2 border-white/50 shadow-lg"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100/95">
                {entry.period}
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-300/10">
                <Sparkles className="h-4 w-4 text-cyan-200" />
              </span>
            </div>

            <CardTitle className="mt-1.5 text-2xl md:text-[1.8rem] leading-tight font-heading text-white">
              {entry.role}
            </CardTitle>
            <p className="mt-1 text-cyan-50 font-medium text-base md:text-[1.08rem] leading-tight">
              {entry.company}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 px-5 pb-5 pt-1.5 md:px-6 md:pb-5 md:pt-1">
        <ul className="space-y-2 md:space-y-1.5">
          {entry.description.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-200/90 shrink-0" />
              <span className="text-slate-100 text-[13.5px] md:text-[13.5px] leading-6 md:leading-[1.48]">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Experience;






