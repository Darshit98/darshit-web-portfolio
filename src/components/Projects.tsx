import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import projectATS from "@/images/project-ATS.png";
import servicesNLP from "@/images/services-nlp.png";
import foodNutriScan from "@/images/FoodNutriScan.jpg";
import textToSql from "@/images/TextToSql.png";
import opinioTrace from "@/images/opinioTrace.jpg";
import { useState } from 'react';

const Projects = () => {
  const projects = [
    {
      title: "SmartQuery Chatbot",
      description: "Developed an intelligent chatbot using AWS Bedrock and LangChain for enhanced user interactions.",
      image: servicesNLP,
      github: "https://github.com/Darshit98/AWSBedrock"
    },
    {
      title: "Food NutriScan",
      description: "It is a food recognition system developed using Generative AI and Gemini API, achieving 90% accuracy in ingredient identification through optimized neural network architecture",
      image: foodNutriScan,
      github: "https://github.com/Darshit98/FoodNutriScan"
    },
    {
      title: "TextToSql",
      description: "This application converts natural language questions into optimized SQL queries using Google's Gemini model. The application is designed to help users easily retrieve data from a SQL database by simply asking questions in English.",
      image: textToSql,
      github: "https://github.com/Darshit98/TextToSql"
    },
    {
      title: "Opinio Trace",
      description: "Engineered end-to-end data pipeline for large-scale sentiment analysis, implementing statistical modeling and transformer based approaches for pattern recognition",
      image: opinioTrace,
      github: "https://github.com/Darshit98/OpinioTrace"
    },
    {
      title: "ATS Optimization System", 
      description: "Created an Applicant Tracking System to improve resume scanning and job matching processes.",
      image: projectATS,
      github: "#"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(projects.length / 3));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(projects.length / 3)) % Math.ceil(projects.length / 3));
  };

  const displayedProjects = projects.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <section id="projects" className="py-20 bg-[#F6BD60]">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-heading text-[#6D4C3D]">Projects</h2>
        <div className="relative max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 h-12 w-12 rounded-full bg-[#6D4C3D]/10 hover:bg-[#6D4C3D]/20 border-2 border-[#6D4C3D]/30"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8 text-[#6D4C3D]" />
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <Card key={index} className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#F6BD60]/10 to-[#BA5A31]/10 border-[#6D4C3D]/20">
                <div className="relative h-48 overflow-hidden bg-[#F6BD60]/5">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
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
            ))}
          </div>

          <Button 
            variant="ghost" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 h-12 w-12 rounded-full bg-[#6D4C3D]/10 hover:bg-[#6D4C3D]/20 border-2 border-[#6D4C3D]/30"
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