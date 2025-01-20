import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          <a href="#" className="text-2xl font-heading font-bold text-blue-600 dark:text-blue-400">
            Darshit's Portfolio
          </a>
          <nav className="flex items-center space-x-8">
            {[
              { href: "#hero", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#experience", label: "Experience" },
              { href: "#skills", label: "Skills" },
              { href: "#services", label: "Expertise" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hidden md:block"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;