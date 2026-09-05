import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle2, Milestone, Server, Award, ChevronRight } from "lucide-react";
import { timelineData } from "../data";

export default function Experience() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      {/* Decorative vertical connection line in background */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-slate-800 to-transparent opacity-30 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            TECHNICAL CAREER PATHWAY
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Professional Experience
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Demonstrating a 15+ year record of technical excellence, from academic laboratory engineering to public sector ICT validation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24 relative">
          
          {timelineData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={`${item.company}-${idx}`}
                className={`flex flex-col md:flex-row items-center relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Connector Node (Center circle) */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-primary/40 flex items-center justify-center text-primary shadow-lg shadow-primary/20 z-20 hidden md:flex hover:border-accent hover:text-accent transition-colors duration-300">
                  <Briefcase className="w-5 h-5" />
                </div>

                {/* Left/Right Card Spacer on Desktop */}
                <div className="w-full md:w-1/2" />

                {/* Timeline Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", damping: 25 }}
                  className="w-full md:w-[45%] lg:w-[42%] relative"
                >
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 shadow-2xl hover:border-primary/30 transition-all duration-300 relative group">
                    {/* Floating corner gradient */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-all duration-500 -z-10" />

                    {/* Timeline top info */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono font-medium text-accent">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>

                      <h4 className="font-display font-extrabold text-xl text-white group-hover:text-glow transition-all duration-300">
                        {item.role}
                      </h4>

                      <h5 className="font-display font-bold text-sm text-primary flex items-center gap-1.5">
                        <Milestone className="w-4 h-4 text-accent" />
                        {item.company}
                      </h5>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-slate-400 font-sans text-sm leading-relaxed mt-4">
                      {item.description}
                    </p>

                    {/* Achievements bullets */}
                    <div className="space-y-3.5 mt-6 pt-6 border-t border-slate-800/80">
                      <h6 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">
                        Key Achievements & Scope:
                      </h6>
                      <ul className="space-y-2.5">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-sans">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Micro footer detailing system logs */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-800/60 pt-4 text-[10px] font-mono text-slate-500">
                      <span>AUDIT_LOG_STABLE</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        VERIFIED <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </span>
                    </div>

                  </div>
                </motion.div>
                
              </div>
            );
          })}
          
        </div>

      </div>
    </section>
  );
}
