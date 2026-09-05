import { motion } from "motion/react";
import { techStackFloating } from "../data";
import { Server, Shield, Cloud, Terminal, Container, Layers, Network, Database } from "lucide-react";

// Helper to match category to small indicators
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "OS/Server":
      return Server;
    case "Directory":
      return Layers;
    case "Cloud":
      return Cloud;
    case "Scripting":
      return Terminal;
    case "Networking":
      return Network;
    case "Virtualization":
      return CpuIcon;
    case "Database":
      return Database;
    default:
      return Shield;
  }
};

const CpuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
  >
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

export default function TechStackFloating() {
  return (
    <section id="techstack" className="py-24 bg-slate-950/20 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            CORE INTEGRATIONS
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Supported Technology Ecosystem
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            A comprehensive overview of operating platforms, directory environments, cloud computing suites, and routing engines.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Technology Bento Grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" 
          id="tech-bento-grid"
        >
          {techStackFloating.map((tech, idx) => {
            const Icon = getCategoryIcon(tech.category);
            // Randomize slow floating animations for each card to create an organic organic ecosystem
            const floatDuration = 4 + (idx % 3) * 1.5;
            const floatDelay = idx * 0.15;

            return (
              <motion.div
                key={tech.name}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: floatDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: floatDelay,
                }}
                className="glass-panel p-4.5 rounded-xl border-white/5 flex flex-col justify-between hover:border-primary/40 group transition-all duration-300 shadow-md relative"
              >
                {/* Floating corner gradient */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-full group-hover:bg-primary/15 transition-all duration-300" />

                {/* Tech specifications */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{tech.category}</span>
                    <span className="text-[10px] font-mono text-accent font-semibold">{tech.level}</span>
                  </div>

                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-200 group-hover:text-glow transition-all">
                    {tech.name}
                  </h4>
                </div>

                {/* Micro indicators footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-900/60 flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase">
                  {Icon === CpuIcon ? <CpuIcon /> : <Icon className="w-3.5 h-3.5" />}
                  <span>verified deployable</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
