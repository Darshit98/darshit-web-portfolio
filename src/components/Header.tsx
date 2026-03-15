// cspell:ignore Darshit

import { MouseEvent, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HEADER_SCROLL_OFFSET = 88;

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { scrollY } = useScroll();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "#hero",
        "#about",
        "#experience",
        "#skills",
        "#services",
        "#projects",
        "#contact",
      ];

      const scrollPosition = window.scrollY + HEADER_SCROLL_OFFSET;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]) as HTMLElement | null;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    scrollTo(href, -HEADER_SCROLL_OFFSET);
    window.history.replaceState(null, "", href);
  };

  if (!mounted) {
    return null;
  }

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 border-b transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm h-14"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-16 dark:border-gray-800"
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-full items-center justify-between px-4 sm:px-8">
          <motion.a
            href="#hero"
            onClick={(event) => handleNavClick(event, "#hero")}
            className="text-2xl font-heading font-bold text-blue-600 dark:text-blue-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Darshit's Portfolio
          </motion.a>

          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hidden md:block"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeSection"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
