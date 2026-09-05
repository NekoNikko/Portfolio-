import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, RefreshCw } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import HomeLab from "./components/HomeLab";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import TechStackFloating from "./components/TechStackFloating";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("&gt; loading core kernel...");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Track scroll progress and handle theme initialization
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((window.scrollY / totalScrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update theme classes on body/html
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("light");
      root.style.setProperty("--color-bg", "#0F172A");
      root.style.setProperty("--color-surface", "#1E293B");
      root.style.setProperty("--color-text", "#F8FAFC");
    } else {
      root.classList.add("light");
      // Soft high-contrast light mode colors
      root.style.setProperty("--color-bg", "#F1F5F9");
      root.style.setProperty("--color-surface", "#FFFFFF");
      root.style.setProperty("--color-text", "#0F172A");
    }
  }, [isDarkMode]);

  // Loading Screen Terminal logs simulation
  useEffect(() => {
    const phrases = [
      "&gt; loading core kernel...",
      "&gt; checking active directory domains: OK",
      "&gt; initiating cloudflare proxies...",
      "&gt; validating pfSense firewall maps...",
      "&gt; loading Marlon T. Argente portfolio: READY"
    ];

    let timerId: NodeJS.Timeout;
    let idx = 0;

    const runLoadingSequence = () => {
      if (idx < phrases.length) {
        setLoadingText(phrases[idx]);
        idx++;
        timerId = setTimeout(runLoadingSequence, 350);
      } else {
        setTimeout(() => setIsLoading(false), 200);
      }
    };

    runLoadingSequence();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${
      isDarkMode ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-[#F1F5F9] text-[#0F172A]"
    }`}>
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[9999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Trailing Custom Cursor */}
      <CustomCursor />

      {/* Canvas Particle Background */}
      <ParticlesBackground isDarkMode={isDarkMode} />

      {/* Atmospheric Background Gradients (Immersive UI Theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className={`fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] transition-all duration-1000 ${
          isDarkMode ? "bg-[#2563EB]/20" : "bg-[#2563EB]/8"
        }`} />
        <div className={`fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] transition-all duration-1000 ${
          isDarkMode ? "bg-[#06B6D4]/12" : "bg-[#06B6D4]/6"
        }`} />
        <div className={`absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full blur-[110px] transition-all duration-1000 ${
          isDarkMode ? "bg-[#3B82F6]/12" : "bg-[#3B82F6]/6"
        }`} />
        <div className={`absolute top-[55%] left-[-15%] w-[40vw] h-[40vw] rounded-full blur-[140px] transition-all duration-1000 ${
          isDarkMode ? "bg-[#2563EB]/10" : "bg-[#2563EB]/4"
        }`} />
        <div className={`absolute top-[80%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-[150px] transition-all duration-1000 ${
          isDarkMode ? "bg-[#06B6D4]/10" : "bg-[#06B6D4]/4"
        }`} />
      </div>

      {/* Terminal Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-950 z-[10000] flex flex-col items-center justify-center p-6 text-center font-mono"
            id="loading-screen"
          >
            <div className="space-y-6 max-w-sm">
              {/* Spinner Visual */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent p-0.5 animate-spin mx-auto shadow-lg shadow-primary/25 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-accent animate-pulse" />
                </div>
              </div>

              {/* Progress text */}
              <div className="space-y-3.5">
                <h3 className="text-white font-extrabold text-sm tracking-widest uppercase">MTA_SYSTEM_BOOTING</h3>
                <div 
                  className="text-[11px] text-accent h-6 overflow-hidden flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: loadingText }}
                />
              </div>

              {/* Loader bar */}
              <div className="w-48 h-1 bg-slate-900 rounded-full mx-auto overflow-hidden border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Header navigation bar */}
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          {/* Core Visual sections */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <HomeLab />
            <Projects />
            <Certifications />
            <TechStackFloating />
            <Testimonials />
            <Blog />
            <Contact />
          </main>

          {/* Footer branding */}
          <Footer />
        </motion.div>
      )}

    </div>
  );
}
