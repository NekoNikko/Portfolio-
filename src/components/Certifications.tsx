import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Server, Award, Cpu, Calendar, BadgeCheck, ExternalLink, ChevronDown, BookOpen } from "lucide-react";
import { certificationsData } from "../data";

const certIconMap: Record<string, any> = {
  Shield: Shield,
  Server: Server,
  Award: Award,
  Cpu: Cpu,
};

// Organize all 49 certificates into cohesive path suites
const suitesDefinition = [
  {
    id: "suite-google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google (via Coursera)",
    date: "Jan 2024",
    badgeColor: "from-blue-600 via-indigo-600 to-cyan-500",
    icon: "Shield",
    description: "Full professional specialization covering threat management, asset security, network security, Linux command line, SQL querying, and Python automation.",
    category: "Google Cybersecurity",
    parentCertId: "google-cyber",
    childCertIds: [
      "google-cyber-c1",
      "google-cyber-c2",
      "google-cyber-c3",
      "google-cyber-c4",
      "google-cyber-c5",
      "google-cyber-c6",
      "google-cyber-c7",
      "google-cyber-c8"
    ]
  },
  {
    id: "suite-win-server",
    title: "Windows Server 2022 & Directory Services Suite",
    issuer: "LinkedIn Learning",
    date: "Feb 2023",
    badgeColor: "from-violet-600 via-indigo-600 to-fuchsia-500",
    icon: "Server",
    description: "Enterprise operating system specialization validating core skills in directory configurations (Active Directory), DNS, and IP address delegation (DHCP).",
    category: "LinkedIn Learning",
    parentCertId: "lil-win-2022-path",
    childCertIds: [
      "lil-win-essential",
      "lil-win-dns",
      "lil-win-ad",
      "lil-win-config"
    ]
  },
  {
    id: "suite-comptia",
    title: "CompTIA Security+ Certification Preparation Track",
    issuer: "LinkedIn Learning",
    date: "Feb 2023",
    badgeColor: "from-red-600 via-rose-600 to-orange-500",
    icon: "Shield",
    description: "Syllabus readiness path centering defensive architecture engineering, security threat landscape evaluation, and core cryptographic implementations.",
    category: "LinkedIn Learning",
    parentCertId: "lil-sec-threats",
    childCertIds: [
      "lil-sec-code",
      "lil-sec-crypto",
      "lil-sec-tips"
    ]
  },
  {
    id: "suite-aws-cloud",
    title: "AWS Certified Cloud Practitioner Pathway",
    issuer: "LinkedIn Learning",
    date: "Jan 2023",
    badgeColor: "from-sky-500 via-blue-600 to-indigo-600",
    icon: "Server",
    description: "Comprehensive pathway for global AWS cloud infrastructure, billing analytics, storage classes, IAM policies, and core serverless compute components.",
    category: "LinkedIn Learning",
    parentCertId: "lil-aws-prep-path",
    childCertIds: [
      "lil-aws-ccp1",
      "lil-aws-ccp2",
      "lil-aws-ccp3",
      "lil-aws-ccp4",
      "lil-aws-serverless"
    ]
  },
  {
    id: "suite-azure-cloud",
    title: "Microsoft Azure & Entra Cloud Administration",
    issuer: "LinkedIn Learning",
    date: "Jan 2023",
    badgeColor: "from-sky-500 to-blue-600",
    icon: "Server",
    description: "Cloud management track focusing on the Azure Portal environment, scripting with CLI/PowerShell, security center firewalls, and Entra ID tenant directories.",
    category: "LinkedIn Learning",
    parentCertId: "lil-azure-portal",
    childCertIds: [
      "lil-azure-cc1",
      "lil-azure-cc2",
      "lil-azure-netsec",
      "lil-entra-basics"
    ]
  },
  {
    id: "suite-agile-devops",
    title: "Lean, DevOps, & Agile Enterprise Specialization",
    issuer: "LinkedIn Learning",
    date: "Jan 2023",
    badgeColor: "from-purple-600 via-fuchsia-600 to-pink-500",
    icon: "Cpu",
    description: "Organizational scaling methodology covering CI/CD pipelines, lean constraint management, team performance optimization, and enterprise agile transformations.",
    category: "LinkedIn Learning",
    parentCertId: "lil-agile-path",
    childCertIds: [
      "lil-devops-lean",
      "lil-devops-transform",
      "lil-lean-foundations",
      "lil-lean-teams",
      "lil-lean-constraints",
      "lil-lean-scale",
      "lil-lean-transform",
      "lil-agile-transform",
      "lil-agile-dev"
    ]
  },
  {
    id: "suite-itil-m365",
    title: "ITIL 4 Service & Microsoft 365 Systems Admin",
    issuer: "LinkedIn Learning",
    date: "Feb 2023",
    badgeColor: "from-emerald-500 via-teal-600 to-sky-500",
    icon: "Cpu",
    description: "Service management structures aligning business goals with modern IT support lifecycles, coupled with Microsoft 365 cloud administrator configuration.",
    category: "LinkedIn Learning",
    parentCertId: "lil-itil-practice",
    childCertIds: [
      "lil-itil-look",
      "lil-m365-admin"
    ]
  },
  {
    id: "suite-cyber-pro",
    title: "LinkedIn Cybersecurity Professional Pathway",
    issuer: "LinkedIn Learning",
    date: "Feb 2023",
    badgeColor: "from-indigo-600 via-purple-600 to-violet-500",
    icon: "Shield",
    description: "Network protection concepts including web application vulnerabilities (OWASP Top 10), penetration testing paradigms, and career pathway foundations.",
    category: "LinkedIn Learning",
    parentCertId: "lil-cyber-path",
    childCertIds: [
      "lil-cyber-foundations",
      "lil-cyber-landscape",
      "lil-cyber-owasp",
      "lil-cyber-job",
      "lil-sec-careers"
    ]
  },
  {
    id: "suite-gov",
    title: "Government Professional Career Service Eligibility",
    issuer: "Civil Service Commission, Philippines",
    date: "2012",
    badgeColor: "from-amber-500 to-yellow-600",
    icon: "Award",
    description: "State eligibility certification validating analytics, professional public administration standards, and structural compliance (Passing Rating: 80.3).",
    category: "Government Eligibility",
    parentCertId: "gov-csc",
    childCertIds: []
  }
];

const categories = ["All", "Google Cybersecurity", "LinkedIn Learning", "Government Eligibility"];

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedSuiteId, setExpandedSuiteId] = useState<string | null>(null);

  const toggleSuite = (id: string) => {
    setExpandedSuiteId(prev => (prev === id ? null : id));
  };

  const filteredSuites = selectedCategory === "All"
    ? suitesDefinition
    : suitesDefinition.filter(suite => suite.category === selectedCategory);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-accent uppercase mb-2">
            TECHNICAL RECOGNITION
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Professional Certifications
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Streamlined pathways validating advanced network security architectures, enterprise systems directory configuration, cloud platforms, and state eligibility.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedSuiteId(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 border font-display ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-accent to-primary text-slate-950 border-transparent shadow-lg shadow-accent/15 scale-105"
                  : "bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Structured Certification Suites Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          id="certifications-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredSuites.map((suite) => {
              const IconComponent = certIconMap[suite.icon] || Award;
              const parentCert = certificationsData.find(c => c.id === suite.parentCertId);
              const childCerts = suite.childCertIds
                .map(cid => certificationsData.find(c => c.id === cid))
                .filter((c): c is typeof certificationsData[0] => !!c);

              const isExpanded = expandedSuiteId === suite.id;
              const totalCredentials = 1 + childCerts.length;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={suite.id}
                  className="glass-panel rounded-2xl border-white/5 flex flex-col justify-between shadow-xl relative group hover:border-accent/30 transition-all duration-300 hover:shadow-accent/5 overflow-hidden bg-slate-900/40"
                >
                  {/* Glowing background accent highlight */}
                  <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-tr ${suite.badgeColor} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    {/* Header bar */}
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${suite.badgeColor} p-px shadow-lg`}>
                          <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-white">
                            <IconComponent className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/30">
                            {suite.category === "Government Eligibility" ? "Civil Service" : suite.category === "Google Cybersecurity" ? "Google" : "L&D Path"}
                          </span>
                          <span className="text-[10px] font-mono text-accent font-semibold flex items-center gap-1 bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                            <BookOpen className="w-3 h-3 text-accent" /> {totalCredentials} {totalCredentials === 1 ? "Credential" : "Credentials"}
                          </span>
                        </div>
                      </div>

                      {/* Suite Details */}
                      <div className="space-y-2">
                        <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-accent transition-all leading-tight">
                          {suite.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-semibold">{suite.issuer} &bull; {suite.date}</p>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">{suite.description}</p>
                      </div>
                    </div>

                    {/* Expand Trigger or Single Direct Verification Link */}
                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col gap-2">
                      {childCerts.length > 0 ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => toggleSuite(suite.id)}
                            className={`w-full py-2 px-3 rounded-lg border transition-all flex items-center justify-between text-xs font-bold tracking-wide font-sans ${
                              isExpanded 
                                ? "bg-accent text-slate-950 border-transparent shadow-md"
                                : "bg-slate-950 text-slate-300 border-white/5 hover:border-accent/40"
                            }`}
                          >
                            <span>{isExpanded ? "Hide Course List" : "Show Course Credentials"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180 text-slate-950" : "text-slate-400"}`} />
                          </button>

                          {/* Individual parent certification validation link if needed */}
                          {parentCert?.verificationUrl && (
                            <a
                              href={parentCert.verificationUrl}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="w-full py-1.5 px-3 rounded-lg bg-slate-950/60 text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-wide font-sans group/parent-btn"
                            >
                              Verify Pathway Certificate
                              <ExternalLink className="w-3 h-3 text-slate-500 group-hover/parent-btn:text-accent group-hover/parent-btn:translate-x-0.5 group-hover/parent-btn:-translate-y-0.5 transition-all" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-500" /> {suite.date}
                            </span>
                            <span className="text-accent flex items-center gap-1 font-bold">
                              VALIDATED <BadgeCheck className="w-3.5 h-3.5 text-accent" />
                            </span>
                          </div>
                          {parentCert?.verificationUrl ? (
                            <a
                              href={parentCert.verificationUrl}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="w-full py-2 px-3 rounded-lg bg-slate-950 text-slate-300 hover:text-white border border-white/5 hover:border-accent/40 transition-all flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide font-sans group/btn"
                            >
                              Verify State Credential
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-accent group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                            </a>
                          ) : (
                            <div className="w-full py-2 px-3 rounded-lg bg-slate-950/50 text-slate-500 border border-transparent flex items-center justify-center gap-1.5 text-xs font-semibold font-sans">
                              Official Registered Copy
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expandable Course List with height and list-item animations */}
                  <AnimatePresence initial={false}>
                    {isExpanded && childCerts.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="border-t border-slate-800/80 bg-slate-950/60 overflow-hidden"
                      >
                        <div className="px-5 py-4 space-y-3.5 max-h-[350px] overflow-y-auto custom-scrollbar">
                          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 font-display">
                            Courses & Credentials Timeline
                          </div>
                          
                          <div className="relative border-l border-slate-800/80 ml-2 pl-4 space-y-4">
                            {/* Render parent course as first element if it has a separate title and verification link */}
                            {parentCert && parentCert.id !== suite.parentCertId && (
                              <div className="relative group/course">
                                {/* Bullet Node */}
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent border border-slate-950 z-10" />
                                <div className="space-y-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="text-[12px] font-bold text-slate-200 leading-snug group-hover/course:text-accent transition-colors">
                                      {parentCert.title}
                                    </h5>
                                    {parentCert.verificationUrl && (
                                      <a
                                        href={parentCert.verificationUrl}
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-accent/40 text-[10px] text-accent font-semibold tracking-wider font-mono shrink-0"
                                      >
                                        Verify <ExternalLink className="w-2.5 h-2.5 text-accent" />
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {parentCert.date}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Render child courses */}
                            {childCerts.map((child, idx) => (
                              <div key={child.id || idx} className="relative group/course">
                                {/* Bullet Node */}
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 group-hover/course:bg-accent border border-slate-950 z-10 transition-colors" />
                                <div className="space-y-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="text-[12px] font-medium text-slate-300 leading-snug group-hover/course:text-white transition-colors">
                                      {child.title}
                                    </h5>
                                    {child.verificationUrl && (
                                      <a
                                        href={child.verificationUrl}
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-accent/40 text-[10px] text-accent font-semibold tracking-wider font-mono shrink-0"
                                      >
                                        Verify <ExternalLink className="w-2.5 h-2.5 text-accent" />
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {child.date}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

