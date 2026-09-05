import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Calendar, Clock, X, ArrowUpRight, 
  Shield, Server, Globe, Terminal, ChevronRight, CheckCircle 
} from "lucide-react";
import { blogPostsData } from "../data";
import { BlogPost } from "../types";

// Map categories to visual badges
const blogCategoryIconMap: Record<string, any> = {
  Cybersecurity: Shield,
  "Windows Server": Server,
  Networking: Globe,
  "Python Automation": Terminal,
};

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            TECHNICAL PUBLICATIONS
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Latest Articles & Guides
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Detailed configurations, security deep-dives, and automation scripts written during my IT engineering career.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="blog-grid">
          {blogPostsData.map((post, idx) => {
            const Icon = blogCategoryIconMap[post.category] || BookOpen;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={post.title}
                onClick={() => setSelectedPost(post)}
                className="glass-panel rounded-3xl border-white/5 overflow-hidden shadow-2xl hover:border-primary/40 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-850/60 text-[10px] font-mono font-bold text-accent">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title and snippet */}
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-glow transition-all">
                      {post.title}
                    </h4>
                    <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.snippet}
                    </p>
                  </div>
                </div>

                {/* Footer validation and trigger */}
                <div className="px-6 sm:px-8 py-5 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between group-hover:bg-slate-950/80 transition-all">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                    Read Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detailed Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              id="blog-reader-modal"
            >
              <motion.article
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-3xl bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Header info */}
                <div className="p-6 sm:p-8 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
                      {(() => {
                        const Icon = blogCategoryIconMap[selectedPost.category] || BookOpen;
                        return <Icon className="w-5 h-5 text-accent" />;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>SYSTEMS PUBLICATION // {selectedPost.category}</span>
                        <span>•</span>
                        <span>{selectedPost.readTime}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-white mt-1 leading-tight">
                        {selectedPost.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all flex-shrink-0 ml-4 interactive"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Core Content scrollable */}
                <div className="p-6 sm:p-10 space-y-6 overflow-y-auto max-h-[calc(90vh-160px)] scrollbar-thin">
                  
                  {/* Introduction banner info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pb-4 border-b border-slate-800/60">
                    <div>DATE: <span className="text-white font-semibold">{selectedPost.date}</span></div>
                    <div>AUTHOR: <span className="text-white font-semibold">Marlon T. Argente</span></div>
                    <div>STATUS: <span className="text-emerald-400 font-semibold">VERIFIED PRODUCTION</span></div>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-5 font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                    <p className="font-semibold text-slate-200 text-base">
                      {selectedPost.snippet}
                    </p>
                    <p>
                      {selectedPost.content}
                    </p>
                    <p>
                      In modern deployments, we prioritize the zero-trust administrative boundaries. This involves setting strict constraints on domain level communications, preventing secondary administrative accounts from holding global domain authority, and enforcing encrypted routing paths between endpoints and virtualization servers.
                    </p>
                    <p>
                      By monitoring system events through specialized host intrusion detection logs, we secure complete visual oversight of system resources. This prevents credential harvesting, tracks malicious binaries, and ensures that overall enterprise workloads operate without risk of disruption.
                    </p>
                  </div>

                  {/* Practical recommendation list */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-3.5">
                    <h5 className="font-display font-bold text-xs text-accent uppercase tracking-wider">
                      Core Implementation Takeaways:
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                      <li className="flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Enforce strong GPO path boundaries to prevent privilege elevation.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Consolidate bare-metal nodes onto hypervisors like Proxmox with proper RAID backup pools.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Avoid port forwarding completely using tunnels, secured by Multi-Factor Authentication.</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Footer validation */}
                <div className="p-5 bg-slate-950 border-t border-slate-850 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 interactive"
                  >
                    Close Reader
                  </button>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
