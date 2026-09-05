import { useEffect, useState, useRef } from "react";
import { personalInfo, educationData, referencesData } from "../data";
import { motion, useInView } from "motion/react";
import { User, Server, Shield, Network, Zap, Award, GraduationCap, Users, Phone } from "lucide-react";

interface CounterProps {
  key?: string;
  value: string;
  label: string;
}

function CountUp({ value, label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  // Parse target number and suffixes
  const target = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Quad ease-out easing formula
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col items-center justify-center text-center shadow-xl group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      <span className="font-display font-extrabold text-4xl xl:text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow">
        {count}
        {suffix}
      </span>
      <span className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide mt-2 block">
        {label}
      </span>
    </div>
  );
}

const keyHighlights = [
  {
    title: "15+ Years IT Experience",
    description: "Deep, hands-on production expertise spanning virtualization, domain management, and endpoint coordination.",
    icon: Award,
    color: "text-primary"
  },
  {
    title: "Enterprise Infrastructure",
    description: "Architecting domain forests, configuring active directories, hypervisors, and multi-subnet networks.",
    icon: Server,
    color: "text-accent"
  },
  {
    title: "Government ICT Auditing",
    description: "Audited 35 primary and secondary schools. Authorized compliance protocols and drafted strategic improvement audits.",
    icon: Shield,
    color: "text-emerald-400"
  },
  {
    title: "Process Automation",
    description: "Deploying Python frameworks, REST endpoints, and custom APIs to trim administration times and eradicate human error.",
    icon: Zap,
    color: "text-amber-400"
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            Professional Profile
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            About Me
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative & Paragraphs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Over a decade of enterprise systems stewardship
              </h4>
              <p className="text-slate-400 font-sans text-base leading-relaxed">
                As a senior technologist, I've spent the past 15+ years engineering high-availability, zero-trust architectures for complex collegiate and public division environments. I specialize in complete directory restructurings, multi-WAN firewall routing (pfSense/MikroTik), and deploying lightweight virtualization clusters (Proxmox VE) that replace aging bare-metal layouts.
              </p>
              <p className="text-slate-400 font-sans text-base leading-relaxed">
                Most recently, within DepEd SDO Tayabas, I've coordinated digital infrastructure validation for 35 distinct public schools, auditing hardware capabilities, identifying server security flaws, and advising on tech allocations. My workflow integrates software support engineering, python scripting automation, and proactive monitoring (Wazuh SIEM) to prevent cyber threats before they disrupt administrative operations.
              </p>
            </div>

            {/* List highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {keyHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <h5 className="font-display font-semibold text-sm text-slate-200">
                        {item.title}
                      </h5>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Counters & Static Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.stats.map((stat) => (
                <CountUp key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Micro details block */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-4 shadow-xl">
              <h5 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
                Deployment Credentials
              </h5>
              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">SYSTEMS ARCH:</span>
                  <span className="text-white">Windows Server 2022 / RHEL / Ubuntu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">VIRTUALIZATION:</span>
                  <span className="text-white">Proxmox VE / ESXi / Hyper-V</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">CYBERSECURITY:</span>
                  <span className="text-white">SIEM / Wazuh / Hardening / Firewall</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">AUTOMATION:</span>
                  <span className="text-white">Python / Bash / PowerShell Scripting</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">REMOTE DIRECT:</span>
                  <span className="text-white">MeshCentral / Cloudflare Tunnels</span>
                </div>
              </div>
            </div>

            {/* Education block */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-4 shadow-xl">
              <h5 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                Education
              </h5>
              <div className="font-sans text-xs sm:text-sm">
                <h6 className="font-bold text-slate-100">{educationData.degree}</h6>
                <p className="text-slate-400 mt-1">{educationData.institution}</p>
                <div className="mt-2 text-[10px] font-mono text-slate-500">GRADUATION_YEAR: {educationData.year}</div>
              </div>
            </div>

            {/* References block */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-4 shadow-xl">
              <h5 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Professional References
              </h5>
              <div className="space-y-3 font-sans text-xs">
                {referencesData.map((ref, idx) => (
                  <div key={idx} className="border-b border-slate-800/40 last:border-0 pb-2.5 last:pb-0">
                    <div className="font-bold text-slate-200">{ref.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{ref.role} • {ref.organization}</div>
                    <div className="font-mono text-accent text-[10px] mt-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> {ref.contact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
