import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import projectATS from "@/images/project-ATS.png";
import servicesNLP from "@/images/services-nlp.png";
import foodNutriScan from "@/images/FoodNutriScan.jpg";
import textToSql from "@/images/TextToSql.png";
import opinioTrace from "@/images/opinioTrace.jpg";
import financeAIAgent from "@/images/FinanceAIAgent.jpeg";
import webcrawler from "@/images/webCrawler.png";
import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { hoverLift } from "@/lib/animations";

const ITEMS_PER_PAGE = 3;

const Projects = () => {
  const projects = [
    {
      title: "Rufus - Web Crawler",
      description: "Rufus is an intelligent web data extraction tool designed to crawl websites and extract relevant information based on user-defined instructions.",
      image: webcrawler,
      github: "https://github.com/Darshit98/Rufus-AI-Agent",
    },
    {
      title: "Financial AI Agent",
      description: "AgenticAI is a Python-based project that integrates multiple AI agents to perform web searches and financial analysis. The project utilizes the Groq model and various tools to provide users with accurate and up-to-date information.",
      image: financeAIAgent,
      github: "https://github.com/Darshit98/AgenticAI",
    },
    {
      title: "SmartQuery Chatbot",
      description: "Developed an intelligent chatbot using AWS Bedrock and LangChain for enhanced user interactions.",
      image: servicesNLP,
      github: "https://github.com/Darshit98/AWSBedrock",
    },
    {
      title: "Food NutriScan",
      description: "It is a food recognition system developed using Generative AI and Gemini API, achieving 90% accuracy in ingredient identification through optimized neural network architecture",
      image: foodNutriScan,
      github: "https://github.com/Darshit98/FoodNutriScan",
    },
    {
      title: "TextToSql",
      description: "This application converts natural language questions into optimized SQL queries using Google's Gemini model. The application is designed to help users easily retrieve data from a SQL database by simply asking questions in English.",
      image: textToSql,
      github: "https://github.com/Darshit98/TextToSql",
    },
    {
      title: "Opinio Trace",
      description: "Engineered end-to-end data pipeline for large-scale sentiment analysis, implementing statistical modeling and transformer based approaches for pattern recognition",
      image: opinioTrace,
      github: "https://github.com/Darshit98/OpinioTrace",
    },
    {
      title: "ATS Optimization System",
      description: "Created an Applicant Tracking System to improve resume scanning and job matching processes.",
      image: projectATS,
      github: "#",
    },
  ];

  const pageCount = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pageCount);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + pageCount) % pageCount);
  };

  const displayedProjects = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return Array.from({ length: ITEMS_PER_PAGE }, (_, offset) => {
      const projectIndex = (startIndex + offset) % projects.length;
      return projects[projectIndex];
    });
  }, [currentPage, projects]);

  const ParallaxCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 300 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      x.set(distanceX * 0.1);
      y.set(distanceY * 0.1);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        style={{ x: xSpring, y: ySpring }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.35 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-[#F6BD60]">
      <div className="container mx-auto px-8">
        <ScrollReveal direction="down">
          <h2 className="text-4xl font-bold text-center mb-12 font-heading text-[#6D4C3D]">Projects</h2>
        </ScrollReveal>

        <div className="relative max-w-7xl mx-auto">
          <Button
            type="button"
            variant="ghost"
            aria-label="Previous projects"
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 z-20 h-12 w-12 rounded-full bg-[#6D4C3D]/10 hover:bg-[#6D4C3D]/20 border-2 border-[#6D4C3D]/30"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8 text-[#6D4C3D]" />
          </Button>

          <motion.div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {displayedProjects.map((project, index) => (
              <ParallaxCard key={`${project.title}-${currentPage}-${index}`} index={index}>
                <motion.div variants={hoverLift} initial="rest" whileHover="hover" layout>
                  <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-gradient-to-br from-[#F6BD60]/10 to-[#BA5A31]/10 border-[#6D4C3D]/20">
                    <motion.div
                      className="relative h-48 overflow-hidden bg-[#F6BD60]/5"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={project.image} alt={project.title} className="w-full h-full object-contain p-4" />
                    </motion.div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl font-heading text-[#6D4C3D] text-center">{project.title}</CardTitle>
                      <CardDescription className="font-body text-[#6D4C3D]/80">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pb-6">
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm" asChild className="border-[#6D4C3D] text-[#6D4C3D] hover:bg-[#6D4C3D]/10">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxCard>
            ))}
          </motion.div>

          <Button
            type="button"
            variant="ghost"
            aria-label="Next projects"
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 z-20 h-12 w-12 rounded-full bg-[#6D4C3D]/10 hover:bg-[#6D4C3D]/20 border-2 border-[#6D4C3D]/30"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8 text-[#6D4C3D]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
