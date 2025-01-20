import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Bot, 
  Database, 
  Cloud, 
  Binary, 
  Sparkles,
  Brain,
  FileSpreadsheet,
  GithubIcon,
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  BarChart,
  Bug
} from "lucide-react";

const Skills = () => {
  const technicalSkills = {
    "AI & ML": ["Azure OpenAI", "Gemini", "RAG", "Hugging Face", "Langchain", "LLMs", "Llama", "Claude", "BERT"],
    "Data Technologies": ["MySQL", "MongoDB", "Airflow", "Talend", "Alteryx", "Snowflake", "PostgreSQL", "SSMS Studio", "Kafka", "Splunk", "Tableau", "PowerBI"],
    "Programming Languages": ["Python", "Java", "JavaScript", "TypeScript", "HTML5", "CSS3"],
    "Cloud Services": ["AWS (S3, EC2, Glue)", "Azure (AI Services, OpenAI, Containers)", "GCP"],
    "Libraries & Tools": ["React", "Node.js", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
    "Professional Tools": ["Advanced Excel", "GitHub", "Atlassian JIRA", "Version Control"]
  };

  return (
    <section id="skills" className="py-20 bg-[#F6BD60]">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-16 font-heading text-[#6D4C3D]">
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(technicalSkills).map(([category, skills]) => (
            <Card 
              key={category} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 
                       bg-gradient-to-br from-[#F6BD60]/10 to-[#BA5A31]/10
                       border-[#6D4C3D]/20 hover:border-[#6D4C3D]/40
                       backdrop-blur-sm"
            >
              <CardHeader className="border-b border-[#6D4C3D]/20">
                <CardTitle className="text-xl font-heading text-[#6D4C3D]">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full
                               bg-[#BA5A31]/10 text-[#6D4C3D]
                               border border-[#6D4C3D]/20
                               hover:bg-[#BA5A31]/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;