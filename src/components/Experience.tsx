import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import northeasternLogo from "../images/Northeastern_University.jpg";
import founderwayLogo from "../images/Founderway.jpg";
import ltiLogo from "../images/LTIMindtree.jpg";
// import vyleroLogo from "../images/vylero-logo.png";
import rivianLogo from "../images/Rivian.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { staggerContainer, tilt3D, textReveal } from "@/lib/animations";
import { useRef } from "react";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const trunkHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 bg-gradient-to-br from-[#1e3a8a] to-gray-800 text-white"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal direction="down">
          <h2 className="text-4xl font-bold text-center mb-16 font-heading dark:text-white">
            Professional Journey
          </h2>
        </ScrollReveal>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Animated Tree trunk */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-4 h-full bg-gradient-to-b from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-full origin-top"
            style={{ scaleY: trunkHeight }}
          />
          
          {/* Tree branches and leaves container */}
          <motion.div
            className="space-y-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
          <TimelineItem 
              company="Rivian Automotive"
              role="AI Technical Lead"
              period="April 2025 - Present"
              description={[
                
              ]}
              align="left"
              icon="🌳"
              logo={rivianLogo}
           />
{/* 


          <TimelineItem 
              company="Vylero - Stealth AI Startup"
              role="AI Engineer"
              period="August 2024 - December 2024"
              description={[
                "Led development of scalable, distributed AI platform supporting 10+ startups, implementing fault-tolerant design patterns and optimizing system performance across multiple microservices",
                "Engineered automated workflow system using GPT-4 models, reducing candidate screening time from days to 1.5 minutes while maintaining 95% accuracy through algorithmic optimization",
                "Designed full-stack architecture with MongoDB, React.js and parallel processing pipelines, reducing evaluation time by 50% while maintaining system scalability",
                "Developed RESTful API handling 800+ concurrent requests for job-specific recommendations to a JavaScript frontend"
              ]}
              align="left"
              icon="🌳"
              logo={vyleroLogo}
            />
 */}
            <TimelineItem 
              company="Northeastern University"
              role="Graduate Teaching Assistant - Generative AI with LLM in Data"
              period="September 2024 - December 2024"
              description={[
                "Led classroom activities and provided comprehensive support through regular TA hours, facilitating effective learning for 30+ graduate students in Generative AI",
                "Mentored student project teams from ideation to implementation, resulting in successful completion of 10+ innovative AI applications"
              ]}
              align="right"
              icon="🌿"
              logo={northeasternLogo}
            />

            

            <TimelineItem 
              company="FounderWay"
              role="AI Engineer"
              period="January 2024 - June 2024"
              description={[
                "Developed RAG system using Azure OpenAI, implementing parallel processing to reduce document processing time by 45% while handling 100K+ daily queries",
                "Built scalable chatbot architecture integrating Azure AI Search with completion API, achieving 30% better response accuracy through algorithm optimization and caching strategies",
                "Applied deep learning techniques for natural language processing, improving query understanding by 25%",
                "Led 4-engineer team establishing AI monitoring practices and validation pipelines with responsible AI practices",
                "Resolved CORS security issues in server-side configuration through Microsoft collaboration for secure cross-origin sharing",
                "Engineered BERT-based custom matching algorithm increasing user satisfaction by 35%"
              ]}
              align="left"
              icon="🍃"
              logo={founderwayLogo}
            />

            <TimelineItem 
              company="Northeastern University"
              role="Graduate Teaching Assistant - Application Engineering Development"
              period="September 2023 - December 2023"
              description={[
                "Mentoring students on software development best practices, including version control, unit testing, code review, and validation, to help them build robust and maintainable Java Swing applications",
                "Supported students individually and in groups, fostering their problem-solving skills and providing constructive feedback to promote their growth and proficiency in Java Swing application development"
              ]}
              align="right"
              icon="🌱"
              logo={northeasternLogo}
            />

            <TimelineItem 
              company="LTI - Larsen & Toubro Infotech"
              role="Senior Quality Engineer"
              period="June 2019 - July 2022"
              description={[
                "Led the UBS team to launch a real-time banking data validation system using Kafka and Splunk, improving data accuracy by 10% and reducing processing time by 40 seconds, through optimized SQL scripts",
                "Built Python-Airflow monitoring framework with custom alerts for 20+ applications, reducing incidents by 45%",
                "Accelerated transformation speed by 30% by automating security data processes using Airflow ETL pipelines",
                "Automated 3 million rows of account data with 5 DAGs, cutting costs by 20% and achieving quicker insights",
                "Developed comprehensive Tableau dashboards for real-time transaction monitoring, analyzing 1M+ daily transactions using complex SQL queries, resulting in 25% faster fraud detection and reporting",
              ]}
              align="left"
              icon="🌳"
              logo={ltiLogo}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  description: string[];
  align: 'left' | 'right';
  icon: string;
  logo: string;
}

const TimelineItem = ({ company, role, period, description, align, icon, logo }: TimelineItemProps) => {
  return (
    <motion.div
      className={`relative flex ${align === 'left' ? 'justify-start' : 'justify-end'} w-full group`}
      variants={textReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Curved branch */}
      <motion.div
        className={`absolute top-1/2 h-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] transform -translate-y-1/2 ${
          align === 'left' ? 'right-[50%]' : 'left-[50%]'
        } w-[calc(50%-2rem)]`}
        style={{
          clipPath: align === 'left' 
            ? 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)' 
            : 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
          borderRadius: '100%',
          transform: `translateY(-50%) ${align === 'left' ? 'rotate(-5deg)' : 'rotate(5deg)'}`,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Branch texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(139, 69, 19, 0.5) 5px, rgba(139, 69, 19, 0.5) 10px)'
          }}
        />
      </motion.div>
      
      <div className={`w-8/12 ${align === 'right' && 'ml-auto'}`}>
        <motion.div
          variants={tilt3D}
          initial="rest"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="relative transform transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
            {/* Leaf icon */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-300 dark:to-green-500 border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center text-lg z-10"
              style={{ [align === 'left' ? 'right' : 'left']: '-44px' }}
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-4 mb-1">
                <motion.img
                  src={logo}
                  alt={company}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <div className="flex-1">
                  <motion.span
                    className="text-sm font-medium text-green-600 dark:text-green-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {period}
                  </motion.span>
                  <CardTitle className="text-xl font-heading">
                    <span className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent font-bold">
                      {role}
                    </span>
                    <span className="block text-lg mt-1 text-muted-foreground font-medium">
                      {company}
                    </span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <motion.ul
                className="list-disc pl-4 space-y-2 text-muted-foreground"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {description.map((point, index) => (
                  <motion.li
                    key={index}
                    className="text-sm leading-relaxed"
                    variants={textReveal}
                  >
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;
