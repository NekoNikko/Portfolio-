import { motion } from "motion/react";
import { Server, Network, Shield, Code, Cloud, Wrench } from "lucide-react";
import { skillCategories } from "../data";

// Map string icons to Lucide icon components
const iconMap: Record<string, any> = {
  Server: Server,
  Network: Network,
  Shield: Shield,
  Code: Code,
  Cloud: Cloud,
  Cpu: Wrench, // Using Wrench or Cpu
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-950/40 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-accent uppercase mb-2">
            TECHNICAL REPERTOIRE
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            System & Engineering Skills
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Rigorous technical foundations tested across high-availability environments and certified by industry standard boards.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid of skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid">
          {skillCategories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Server;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={category.title}
                className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-lg hover:border-accent/30 transition-all duration-300 hover:shadow-accent/5"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-accent">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-100">
                      {category.title}
                    </h4>
                  </div>

                  {/* Skills Progress bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-300">{skill.name}</span>
                          <span className="font-mono text-slate-500 font-semibold">{skill.level}%</span>
                        </div>
                        {/* Outer track */}
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                          {/* Inner bar */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro bottom status */}
                <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
                  <span>DEPLOYABLE MODULE</span>
                  <span className="text-accent animate-pulse">● READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
