import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import darshitProfile from "@/images/darshit-profile.png";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { staggerContainer, textReveal, hoverGlow } from "@/lib/animations";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#F6BD60]">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="down">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6D4C3D]">About Me</h2>
        </ScrollReveal>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScrollReveal direction="right" className="w-full md:w-1/3">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img
                src={darshitProfile}
                alt="Darshit Shah"
                className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-4 border-[#6D4C3D]/20 shadow-[0_0_25px_rgba(109,76,61,0.3)]"
                whileHover={{
                  boxShadow: "0 0 40px rgba(109,76,61,0.5)",
                  borderColor: "rgba(109,76,61,0.4)",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </ScrollReveal>
          <ScrollReveal direction="left" className="w-full md:w-2/3">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="bg-gradient-to-br from-[#F6BD60]/10 to-[#BA5A31]/10 border-[#6D4C3D]/20">
                <CardContent className="p-6">
                  <motion.h3
                    className="text-2xl font-semibold mb-4 text-[#6D4C3D]"
                    variants={textReveal}
                  >
                    AI & Data Engineer
                  </motion.h3>
                  <motion.p
                    className="text-lg leading-relaxed mb-6 text-[#6D4C3D]"
                    variants={textReveal}
                  >
                    Hey there! I'm Darshit Shah, a passionate AI and Data Engineer from Northeastern University, Boston. My journey in tech is driven by a love for transforming data into innovative solutions using Generative AI, Large Language Models, and advanced data visualization techniques.
                  </motion.p>
                  <motion.p
                    className="text-lg leading-relaxed mb-6 text-[#6D4C3D]"
                    variants={textReveal}
                  >
                    When I'm not diving into data, you'll find me exploring the latest world affairs, uncovering the mysteries of numerology, traveling to new destinations, and indulging in diverse cuisines.
                  </motion.p>
                  {/* <Button>More About Me</Button> */}
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;