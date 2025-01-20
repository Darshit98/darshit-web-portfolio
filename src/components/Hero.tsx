import { Github, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import ResumeRequestDialog from "./ResumeRequestDialog";
import backgroundImage from "../images/background-image.png";
// import ChatWidget from './ChatWidget';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["AI Engineering", "Data Engineering", "Data Analysis", "Machine Learning"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <section 
      id="hero"
      className="relative pt-32 min-h-screen flex items-center bg-gradient-to-br from-background to-muted"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-background/30" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl space-y-8 px-4 sm:px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[#ff8c00] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Pioneering the Future with AI and Data
            </h3>
            <h1 className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary to-[#ff8c00] bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              I'm Darshit Shah
            </h1>
            <h3 className="text-2xl md:text-3xl font-bold text-[#ff8c00] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Expert in <span ref={typedRef}></span>
            </h3>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            As a Data Engineer and AI Enthusiast, I specialize in leveraging Generative AI, 
            Large Language Models (LLMs), and advanced data visualization techniques to turn 
            data into powerful insights. Join me in transforming the ordinary into the extraordinary.
          </p>

          <div className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <a
              href="https://www.linkedin.com/in/darshit131998/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 
                       border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white 
                       transition-all duration-300 hover:shadow-lg hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/darshit98"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 
                       border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white 
                       transition-all duration-300 hover:shadow-lg hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <ResumeRequestDialog />
          </div>
        </div>
      </div>
      {/* <ChatWidget /> */}
    </section>
  );
};

export default Hero;