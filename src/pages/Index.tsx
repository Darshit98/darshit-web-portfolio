import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgressBar } from "@/components/animations/ScrollProgressBar";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Index = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <SmoothScrollProvider enabled={!prefersReducedMotion}>
        <div className="min-h-screen bg-background text-foreground">
          {!prefersReducedMotion && <ScrollProgressBar />}
          <Header />
          <main>
            <Hero />
            <div className="bg-gray-50 dark:bg-gray-900">
              <About />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800">
              <Experience />
            </div>
            <div className="bg-gray-50 dark:bg-gray-900">
              <Skills />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800">
              <Services />
            </div>
            <div className="bg-gray-50 dark:bg-gray-900">
              <Projects />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800">
              <Contact />
            </div>
          </main>
          <Footer />
          <Toaster />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
};

export default Index;
