import { ArrowUp, Terminal, ShieldAlert } from "lucide-react";
import { personalInfo } from "../data";

const footerLinks = [
  { name: "About Me", href: "#about" },
  { name: "My Skills", href: "#skills" },
  { name: "Timeline", href: "#timeline" },
  { name: "Home Lab", href: "#homelab" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Latest Blog", href: "#blog" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-900/80 py-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left branding */}
        <div className="space-y-3 text-center md:text-left">
          <a
            href="#"
            className="flex items-center justify-center md:justify-start gap-2.5 font-display font-bold text-lg tracking-tight text-white group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-md">
              <Terminal className="w-4.5 h-4.5 text-white" />
            </div>
            <span>
              Marlon<span className="text-accent">.</span>T<span className="text-primary">.</span>A
            </span>
          </a>
          <p className="text-slate-500 font-sans text-xs sm:text-sm">
            IT Specialist & Systems Engineer. Consistently deploying stable systems for 15+ years.
          </p>
        </div>

        {/* Center shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-sans text-slate-400">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-accent transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right back to top & copy */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-center sm:text-right font-mono text-[10px] text-slate-500">
            <div>© {new Date().getFullYear()} MARLON T. ARGENTE.</div>
            <div className="text-accent tracking-wider">ALL CORE WORKLOADS UP</div>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-primary text-slate-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 interactive"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}
