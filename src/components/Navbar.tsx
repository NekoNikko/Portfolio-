import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Timeline", href: "#timeline" },
  { name: "Home Lab", href: "#homelab" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link calculation based on viewport scroll height
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const element = document.querySelector(link.href);
        if (element) {
          const top = (element as HTMLElement).offsetTop;
          const height = (element as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 py-3 lg:py-4"
    >
      <div 
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 rounded-2xl ${
          isScrolled
            ? "bg-slate-800/40 backdrop-blur-md border border-slate-700/50 py-2.5 shadow-xl shadow-blue-500/5"
            : "bg-transparent py-3 border border-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-display font-bold text-xl tracking-tight text-white group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Terminal className="w-5. h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">
            Marlon<span className="text-accent">.</span>T<span className="text-primary">.</span>A
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5" id="desktop-menu">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 ${
                  isActive ? "text-accent" : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}

          <div className="w-px h-5 bg-slate-700/60 mx-2" />

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all border border-slate-800 interactive"
            aria-label="Toggle theme mode"
            id="theme-toggler"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile/Tablet Menu Controls */}
        <div className="flex items-center gap-3 lg:hidden" id="mobile-menu-controls">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all border border-slate-800 interactive"
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all border border-slate-800 interactive"
            aria-label="Toggle navigation menu"
            id="hamburger-btn"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden w-full border-t border-slate-800/80 glass-panel mt-3 overflow-hidden shadow-2xl"
            id="mobile-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === link.href
                      ? "bg-primary/20 text-accent border border-primary/20"
                      : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
