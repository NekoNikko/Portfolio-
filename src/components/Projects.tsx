import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Server, Shield, Network, Terminal, Database, Cpu, Globe, 
  TrendingUp, Monitor, Github, ExternalLink, X, BookOpen, Layers, CheckCircle 
} from "lucide-react";
import { projectsData } from "../data";
import { Project } from "../types";

// Map project graphic aliases to lucide icons for premium vector graphics representation
const projectIconMap: Record<string, any> = {
  server: Server,
  "folder-tree": Layers,
  network: Network,
  terminal: Terminal,
  database: Database,
  shield: Shield,
  cpu: Cpu,
  globe: Globe,
  "trending-up": TrendingUp,
  monitor: Monitor,
};

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Infrastructure", "Networking", "Programming", "Cybersecurity"];

  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-950/40 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            PRODUCTION ARCHITECTURES
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Featured Projects
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            A selective exhibition of custom integrations, routing architectures, cybersecurity sandboxes, and automated report managers.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Categories Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="projects-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border interactive ${
                filter === cat
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                  : "bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const GraphicComponent = projectIconMap[project.image] || Server;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="glass-panel rounded-2xl border-white/5 flex flex-col justify-between overflow-hidden shadow-xl hover:border-primary/40 group transition-all duration-300 relative hover:-translate-y-1"
                >
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />

                  {/* Card Header Illustration Body */}
                  <div className="p-6 bg-slate-950/60 aspect-[16/10] flex flex-col items-center justify-center relative border-b border-slate-900/60 overflow-hidden">
                    {/* Glowing mesh spot */}
                    <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-primary group-hover:scale-110 group-hover:text-glow transition-all duration-500 shadow-inner">
                      <GraphicComponent className="w-8 h-8 group-hover:text-accent transition-colors duration-300" />
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-4">
                      {project.category} // ARCH_UNIT
                    </span>
                  </div>

                  {/* Card Content Description */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h4 className="font-display font-extrabold text-lg text-slate-100 group-hover:text-glow transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-850/60 text-[10px] font-mono text-slate-400">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-850/60 text-[10px] font-mono text-slate-500 font-bold">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons footer */}
                  <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-900/40 gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-2.5 rounded-lg font-medium text-xs bg-slate-900 border border-slate-800 hover:border-accent/40 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all duration-300 flex-grow justify-center interactive"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Read More
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl || "#"}
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white transition-all interactive"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl || "#"}
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 hover:border-primary/60 text-primary hover:text-accent transition-all interactive"
                        title="Launch Project Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Detailed Project Specs Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              id="project-spec-modal"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Modal header visual */}
                <div className="p-6 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
                      {(() => {
                        const IconComp = projectIconMap[selectedProject.image] || Server;
                        return <IconComp className="w-5 h-5 text-accent" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none block">
                        SYSTEMS CONFIGURATION DEPLOYMENT
                      </span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-white mt-1">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all interactive"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal body scrollable */}
                <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">SYSTEMS DEPLOYMENT OVERVIEW:</h5>
                    <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Core Architecture requirements */}
                  <div className="space-y-3 pt-6 border-t border-slate-800/80">
                    <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">INTEGRATED TECHNOLOGY LAYER:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <div key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                          <CheckCircle className="w-3.5 h-3.5 text-accent" />
                          <span className="font-mono font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated terminal validation logs */}
                  <div className="space-y-2 pt-6 border-t border-slate-800/80 font-mono text-xs">
                    <h5 className="text-xs text-slate-500 uppercase tracking-wider font-bold">NODE INTEGRITY CHECKS:</h5>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-slate-400 space-y-1">
                      <div>&gt; verify connection: OK (200)</div>
                      <div className="text-emerald-400">&gt; telemetry verification: clean build deployment</div>
                      <div className="text-accent">&gt; hash key integrity: matches primary keys</div>
                      <div className="text-slate-500">&gt; systems log: uptime verified 100% stable</div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="p-6 bg-slate-950 border-t border-slate-850 flex items-center justify-end gap-3">
                  <a
                    href={selectedProject.githubUrl || "#"}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-medium tracking-wide transition-all duration-300 interactive"
                  >
                    <Github className="w-4 h-4" /> View Source
                  </a>
                  <a
                    href={selectedProject.demoUrl || "#"}
                    className="px-4 py-2.5 rounded-xl bg-primary text-white flex items-center gap-2 text-xs font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-primary/20 interactive"
                  >
                    <ExternalLink className="w-4 h-4" /> Live System Demo
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
