import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import darshitProfile from "@/images/darshit-profile.png";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#F6BD60]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#6D4C3D]">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <img 
              src={darshitProfile} 
              alt="Darshit Shah" 
              className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-4 border-[#6D4C3D]/20 shadow-[0_0_25px_rgba(109,76,61,0.3)]"
            />
          </div>
          <Card className="w-full md:w-2/3 bg-gradient-to-br from-[#F6BD60]/10 to-[#BA5A31]/10 border-[#6D4C3D]/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#6D4C3D]">AI & Data Engineer</h3>
              <p className="text-lg leading-relaxed mb-6 text-[#6D4C3D]">
                Hey there! I'm Darshit Shah, a passionate AI and Data Engineer from Northeastern University, Boston. My journey in tech is driven by a love for transforming data into innovative solutions using Generative AI, Large Language Models, and advanced data visualization techniques.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-[#6D4C3D]">
                When I'm not diving into data, you'll find me exploring the latest world affairs, uncovering the mysteries of numerology, traveling to new destinations, and indulging in diverse cuisines.
              </p>
              {/* <Button>More About Me</Button> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;