import { useState, useEffect } from "react";
import { ArrowRight, Server, Shield, Network, Terminal, Code, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data";

const titles = [
  "IT Specialist",
  "Systems Administrator",
  "Network Engineer",
  "Software Support Engineer",
  "Cybersecurity Enthusiast",
];

const renderBioWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [subTitleText, setSubTitleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = titles[titleIdx];

    const handleTyping = () => {
      if (!isDeleting) {
        setSubTitleText(currentFullText.substring(0, subTitleText.length + 1));
        setTypingSpeed(100);

        if (subTitleText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before starting delete
          return;
        }
      } else {
        setSubTitleText(currentFullText.substring(0, subTitleText.length - 1));
        setTypingSpeed(50);

        if (subTitleText === "") {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [subTitleText, isDeleting, titleIdx, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Grid Background with slow rotation & pulse */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Decorative Radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-primary/10 blur-[120px] -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full bg-accent/10 blur-[100px] -z-10 animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-7 space-y-8 text-left" id="hero-left">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/5 text-sm font-medium text-accent hover:border-accent/30 transition-all duration-300 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="tracking-wide">Enterprise Engineering & Modern IT Solutions</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-none"
            >
              Hi, I am <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow inline-block py-1">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Subheading Typing animation */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200 flex items-center gap-2 h-10"
            >
              <Terminal className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-slate-300">I am a</span>
              <span className="text-accent min-w-[200px] border-r-2 border-accent animate-pulse pr-1">
                {subTitleText}
              </span>
            </motion.h2>
          </div>

          {/* Brief Abstract */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-sans"
          >
            {renderBioWithBold(personalInfo.bio)}
          </motion.p>

          {/* Actions CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
            id="hero-actions"
          >
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl font-medium text-sm tracking-wide bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 interactive"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl font-medium text-sm tracking-wide border border-slate-700 hover:border-accent hover:bg-accent/5 text-slate-300 hover:text-white flex items-center gap-2 transition-all duration-300 interactive"
            >
              Contact Me
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl font-medium text-sm tracking-wide bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 flex items-center gap-2 transition-all duration-300 interactive"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Hero Right Visuals - High Tech server rack visual style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
          id="hero-right-graphic"
        >
          {/* Animated orbiting rings */}
          <div className="absolute inset-0 border border-dashed border-primary/20 rounded-full animate-spin duration-[40000ms] -z-10" />
          <div className="absolute -inset-4 border border-dashed border-accent/20 rounded-full animate-spin duration-[60000ms] -z-10" />

          {/* Interactive Server Rack Isometric Panel */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 shadow-2xl relative max-w-sm sm:max-w-md mx-auto aspect-square overflow-hidden group">
            {/* Background glowing gradient */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">SYSTEM_NODE_CONSOLE // STABLE</span>
            </div>

            {/* Interactive visualization grids */}
            <div className="space-y-4 font-mono text-xs text-slate-400">
              {/* Row 1: Active Directory */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-primary/40 hover:bg-slate-900 transition-all group/row">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <div className="font-semibold text-slate-200">mta-dc-01.local</div>
                    <div className="text-[10px] text-emerald-400">Windows Server 2022</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">CPU LOAD</div>
                  <div className="text-accent font-semibold">14.2%</div>
                </div>
              </div>

              {/* Row 2: Security Agent */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-accent/40 hover:bg-slate-900 transition-all group/row">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent animate-pulse" />
                  <div>
                    <div className="font-semibold text-slate-200">Wazuh HIDS Agent</div>
                    <div className="text-[10px] text-emerald-400">SIEM Connected</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">PACKETS/S</div>
                  <div className="text-primary font-semibold">1,024</div>
                </div>
              </div>

              {/* Row 3: pfSense Firewall Router */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-emerald-500/40 hover:bg-slate-900 transition-all group/row">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <div>
                    <div className="font-semibold text-slate-200">pfsense-gate.local</div>
                    <div className="text-[10px] text-emerald-400">Multi-WAN Gateway</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">STATE</div>
                  <div className="text-emerald-400 font-semibold uppercase">ACTIVE</div>
                </div>
              </div>

              {/* System Console Feed */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400 h-28 overflow-hidden space-y-1 scrollbar-thin">
                <div className="text-accent">&gt; initializing virtual networking clusters...</div>
                <div className="text-emerald-400">&gt; proxying cloudflare tunnel: OK</div>
                <div className="text-slate-500">&gt; auditing schools Division Tayabas 35/35: DONE</div>
                <div className="text-primary">&gt; loading active directory roles: Success</div>
                <div className="text-slate-300 animate-pulse">&gt; system up: 15+ years of production...</div>
              </div>
            </div>
          </div>

          {/* Floating badges on corners */}
          <div className="absolute -top-6 -left-6 bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-100">15+ Years</div>
              <div className="text-[11px] text-slate-400">Enterprise IT Exper.</div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-100">Python/Shell</div>
              <div className="text-[11px] text-slate-400">Automation & CI</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
