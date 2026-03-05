import { Card, CardContent } from "@/components/ui/card";
import dataIcon from "@/images/DataIcon.png";
import aiIcon from "@/images/AIIcon.png";
import dataVizIcon from "@/images/DataVisualizationIcon.png";
import nlpIcon from "@/images/services-nlp.png";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { staggerContainer, tilt3D, iconRotate, iconPulse, borderMorph, hoverGlow } from "@/lib/animations";

const Services = () => {
  const services = [
    {
      title: "AI & Machine Learning",
      description: "Developing AI-driven solutions and machine learning models to solve complex problems. Proficient in using frameworks like TensorFlow, PyTorch, and scikit-learn for predictive analytics and automation.",
      icon: aiIcon,
    },
    {
      title: "Data Engineering",
      description: "Designing, building, and maintaining scalable data pipelines to process and analyze large datasets. Expertise in ETL processes, data warehousing, and cloud data platforms like AWS and Azure.",
      icon: dataIcon,
    },
    {
      title: "Natural Language Processing",
      description: "Implementing NLP techniques to extract insights from textual data. Experienced in building chatbots, sentiment analysis tools, and text classification models using BERT, GPT, and other state-of-the-art models.",
      icon: nlpIcon,
    },
    {
      title: "Data Visualization",
      description: "Creating interactive and insightful visualizations to help stakeholders make data-driven decisions. Skilled in tools like Power BI, Tableau, and D3.js to present data in a clear and impactful manner.",
      icon: dataVizIcon,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#1e3a8a] to-gray-800 text-white">
      <div className="container mx-auto px-8">
        <ScrollReveal direction="down">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-white">My </span>
              <span className="text-[#60a5fa]">Expertise</span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={tilt3D}
              initial="rest"
              whileHover="hover"
              className="group"
            >
              <motion.div variants={borderMorph} initial="rest" whileHover="hover">
                <Card 
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300
                            relative overflow-hidden"
                >
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-transparent"
                  variants={hoverGlow}
                  initial="rest"
                  whileHover="hover"
                />
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      className="w-24 h-24 flex items-center justify-center mb-4"
                      variants={iconPulse}
                      initial="rest"
                      whileHover="hover"
                    >
                      <motion.img
                        src={service.icon}
                        alt={service.title}
                        className="w-full h-full object-contain"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-bold text-[#60a5fa]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;