import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, Cpu, Server, Container, Terminal, Info, Network, Key, AlertTriangle } from "lucide-react";

interface LabNode {
  id: string;
  name: string;
  category: string;
  icon: any;
  spec: string;
  description: string;
  details: string[];
}

const labNodes: LabNode[] = [
  {
    id: "internet",
    name: "Public Internet",
    category: "WAN",
    icon: Globe,
    spec: "Redundant Dynamic WAN",
    description: "Public networks connecting remote clients, DepEd administrators, and home web-hooks safely.",
    details: [
      "Dynamic WAN IP monitored via custom dynamic DNS scripts",
      "Protected by Cloudflare CDN caching and DDoS mitigation",
      "Supports SSL encryption from client browser edge"
    ]
  },
  {
    id: "cloudflare",
    name: "Cloudflare Tunnel",
    category: "Edge Routing",
    icon: Key,
    spec: "cloudflared proxy daemon",
    description: "Connects local servers to the Cloudflare network securely, bypassing local NAT without port forwarding.",
    details: [
      "Bypasses ISP carrier-grade NAT constraints",
      "No open inbound ports on pfSense firewall, maximizing defense",
      "Linked directly to MeshCentral remote administration nodes"
    ]
  },
  {
    id: "pfsense",
    name: "pfSense Firewall",
    category: "Network Gateway",
    icon: Shield,
    spec: "Netgate Core Router OS",
    description: "Primary network barrier managing WAN/LAN, multi-subnet VLAN isolation, and stateful packet inspection.",
    details: [
      "Configured 4 distinct VLAN segments (Management, Lab, IoT, Guest)",
      "Strict inter-VLAN firewall rules blocking unauthorized node hops",
      "Configured with Snort IDS and automated routing failovers"
    ]
  },
  {
    id: "proxmox",
    name: "Proxmox Server",
    category: "Hypervisor Virtualization",
    icon: Cpu,
    spec: "Proxmox VE 8.1 Cluster",
    description: "The core computing engine hosting VMs and lightweight LXC containers on redundant enterprise disks.",
    details: [
      "Hardware: Intel Xeon, 64GB ECC RAM, ZFS RAID-1 array",
      "Automated VM snapshots backed up to Proxmox Backup Server (PBS)",
      "Centralized template deployment for instant testing sandboxes"
    ]
  },
  {
    id: "win-server",
    name: "Windows Server 2022",
    category: "System Workload",
    icon: Server,
    spec: "VM // Active Directory",
    description: "Centralized directory and access manager managing accounts, permissions, and GPO policies.",
    details: [
      "Windows Server 2022 Active Directory Domain Services (AD DS)",
      "Configured secure GPO standards restricting endpoint privilege",
      "Integrates with DNS & DHCP server roles for internal IP management"
    ]
  },
  {
    id: "docker",
    name: "Docker Containers",
    category: "Container Host",
    icon: Container,
    spec: "Ubuntu LXC // Docker Compose",
    description: "Extremely fast container host serving admin portals, telemetry databases, and microservices.",
    details: [
      "Hosts MeshCentral remote agent endpoints",
      "Local Portainer monitoring and automatic watchtower updates",
      "Reverse proxying via Nginx Proxy Manager (NPM)"
    ]
  },
  {
    id: "wazuh",
    name: "Wazuh SIEM",
    category: "Security Cluster",
    icon: Shield,
    spec: "SIEM // Elastic Stack",
    description: "The cybersecurity watchdog collecting system logs and detecting anomalies.",
    details: [
      "Unified log aggregation from all Linux, Windows, and Proxmox nodes",
      "Automated file integrity monitoring (FIM) on core file servers",
      "Triggers notifications on brute force or malicious credential cycles"
    ]
  },
  {
    id: "ubuntu-server",
    name: "Ubuntu Server",
    category: "Automation Host",
    icon: Terminal,
    spec: "Linux VM // Automation",
    description: "Central host for Python-based administrative tasks and environmental dashboards.",
    details: [
      "Runs automated CSV parsing audit jobs on standard cron schedules",
      "Hosts Hydroponics dashboard and sensor database metrics",
      "Maintains direct secure APIs for automated system reports"
    ]
  }
];

export default function HomeLab() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("proxmox");
  const selectedNode = labNodes.find((node) => node.id === selectedNodeId) || labNodes[3];

  return (
    <section id="homelab" className="py-24 bg-slate-950/20 relative overflow-hidden">
      {/* Dynamic Background visual highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-accent uppercase mb-2">
            ISOLATED TESTING ENVIRONMENT
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Interactive Home Lab Architecture
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            A sandboxed, self-hosted enterprise model designed to replicate cybersecurity protocols, domain structures, and python telemetry. Click nodes to audit specs.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Master layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Diagram Stage (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border-white/5 relative overflow-hidden">
            {/* Diagram Title */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">NETWORK_MAP_VIEWER // INTERACTIVE</span>
              <span className="text-[10px] text-accent font-mono flex items-center gap-1.5 animate-pulse">
                <Network className="w-3 h-3 text-accent" /> CONNECTED & STREAMING
              </span>
            </div>

            {/* SVG Interactive Topology layout */}
            <div className="relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[450px] bg-slate-950/60 rounded-2xl border border-slate-900/60 p-4 sm:p-8 flex items-center justify-center">
              
              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>
                  <style>
                    {`
                      @keyframes flowDash {
                        to {
                          stroke-dashoffset: -20;
                        }
                      }
                      .connecting-pipe {
                        stroke-dasharray: 6, 4;
                        animation: flowDash 0.8s linear infinite;
                      }
                    `}
                  </style>
                </defs>

                {/* Draw connecting pipes between nodes relative to grid spacing */}
                {/* 1. Internet to Cloudflare */}
                <line x1="50%" y1="12%" x2="50%" y2="28%" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />
                
                {/* 2. Cloudflare to pfSense */}
                <line x1="50%" y1="28%" x2="50%" y2="44%" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />

                {/* 3. pfSense to Proxmox */}
                <line x1="50%" y1="44%" x2="50%" y2="60%" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />

                {/* 4. Proxmox Server to sub-nodes branches (tree architecture) */}
                {/* Branch Left: Windows Server */}
                <path d="M 50% 60% L 20% 60% L 20% 76%" fill="none" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />
                
                {/* Branch Middle: Docker Host */}
                <line x1="50%" y1="60%" x2="50%" y2="76%" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />

                {/* Branch Right: Ubuntu Automation VM */}
                <path d="M 50% 60% L 80% 60% L 80% 76%" fill="none" stroke="url(#blueGlow)" strokeWidth="2" className="connecting-pipe" />

                {/* 5. Docker to Wazuh SIEM */}
                <line x1="50%" y1="76%" x2="50%" y2="92%" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

              </svg>

              {/* Grid Placement representing network tiers */}
              <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-8 z-10">
                
                {/* Tier 1: Entry WAN */}
                <div className="flex justify-center h-[12%]">
                  <button
                    onClick={() => setSelectedNodeId("internet")}
                    className={`px-4 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2.5 transition-all duration-300 shadow-md interactive ${
                      selectedNodeId === "internet"
                        ? "bg-primary/20 border-primary text-white scale-105 shadow-primary/20 ring-1 ring-primary/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Globe className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: "12s" }} />
                    <div className="text-left">
                      <div className="font-bold text-[11px] leading-tight">Internet WAN</div>
                      <div className="text-[9px] text-slate-500 font-normal">WAN_INPORT</div>
                    </div>
                  </button>
                </div>

                {/* Tier 2: Cloud Access */}
                <div className="flex justify-center h-[12%]">
                  <button
                    onClick={() => setSelectedNodeId("cloudflare")}
                    className={`px-4 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2.5 transition-all duration-300 shadow-md interactive ${
                      selectedNodeId === "cloudflare"
                        ? "bg-primary/20 border-accent text-white scale-105 shadow-accent/20 ring-1 ring-accent/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Key className="w-4 h-4 text-accent" />
                    <div className="text-left">
                      <div className="font-bold text-[11px] leading-tight">Cloudflare Tunnel</div>
                      <div className="text-[9px] text-slate-500 font-normal">cloudflared</div>
                    </div>
                  </button>
                </div>

                {/* Tier 3: Security Routing Gateway */}
                <div className="flex justify-center h-[12%]">
                  <button
                    onClick={() => setSelectedNodeId("pfsense")}
                    className={`px-4 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2.5 transition-all duration-300 shadow-md interactive ${
                      selectedNodeId === "pfsense"
                        ? "bg-primary/20 border-emerald-500 text-white scale-105 shadow-emerald-500/20 ring-1 ring-emerald-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <div className="text-left">
                      <div className="font-bold text-[11px] leading-tight">pfSense Firewall</div>
                      <div className="text-[9px] text-slate-500 font-normal">pfsense-gateway</div>
                    </div>
                  </button>
                </div>

                {/* Tier 4: Physical Hypervisor Compute */}
                <div className="flex justify-center h-[12%]">
                  <button
                    onClick={() => setSelectedNodeId("proxmox")}
                    className={`px-5 py-3 rounded-xl border font-mono text-xs flex items-center gap-3 transition-all duration-300 shadow-md interactive ${
                      selectedNodeId === "proxmox"
                        ? "bg-primary/25 border-primary text-white scale-105 shadow-primary/30 ring-1 ring-primary/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Cpu className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-bold text-[11px] leading-tight">Proxmox Server VE</div>
                      <div className="text-[9px] text-slate-500 font-normal">proxmox-pve-01</div>
                    </div>
                  </button>
                </div>

                {/* Tier 5: Sub-nodes Clusters VMs */}
                <div className="flex justify-between items-center h-[12%] px-0 sm:px-6">
                  
                  {/* VM 1: Windows Server */}
                  <button
                    onClick={() => setSelectedNodeId("win-server")}
                    className={`px-3 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2 transition-all duration-300 shadow-md max-w-[28%] sm:max-w-none interactive ${
                      selectedNodeId === "win-server"
                        ? "bg-primary/20 border-primary text-white scale-15 shadow-primary/20 ring-1 ring-primary/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Server className="w-4 h-4 text-primary" />
                    <div className="text-left hidden sm:block">
                      <div className="font-bold text-[10px] leading-tight">Windows Server AD</div>
                      <div className="text-[8px] text-slate-500">win-dc-2022</div>
                    </div>
                    <span className="sm:hidden font-bold text-[10px]">Windows AD</span>
                  </button>

                  {/* LXC 2: Docker Host & SIEM */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => setSelectedNodeId("docker")}
                      className={`px-3 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2 transition-all duration-300 shadow-md interactive ${
                        selectedNodeId === "docker"
                          ? "bg-primary/20 border-accent text-white scale-105 shadow-accent/20 ring-1 ring-accent/40"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <Container className="w-4 h-4 text-accent" />
                      <div className="text-left hidden sm:block">
                        <div className="font-bold text-[10px] leading-tight">Docker Host</div>
                        <div className="text-[8px] text-slate-500">lxc-docker-core</div>
                      </div>
                      <span className="sm:hidden font-bold text-[10px]">Docker</span>
                    </button>
                  </div>

                  {/* VM 3: Ubuntu Automation Host */}
                  <button
                    onClick={() => setSelectedNodeId("ubuntu-server")}
                    className={`px-3 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-2 transition-all duration-300 shadow-md max-w-[28%] sm:max-w-none interactive ${
                      selectedNodeId === "ubuntu-server"
                        ? "bg-primary/20 border-indigo-400 text-white scale-105 shadow-indigo-400/20 ring-1 ring-indigo-400/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <div className="text-left hidden sm:block">
                      <div className="font-bold text-[10px] leading-tight">Ubuntu Dev Host</div>
                      <div className="text-[8px] text-slate-500">vm-python-py</div>
                    </div>
                    <span className="sm:hidden font-bold text-[10px]">Ubuntu Python</span>
                  </button>

                </div>

                {/* Tier 6: Wazuh SIEM Endpoint (At the absolute bottom linked from Docker) */}
                <div className="flex justify-center h-[12%]">
                  <button
                    onClick={() => setSelectedNodeId("wazuh")}
                    className={`px-4 py-2 rounded-xl border font-mono text-xs flex items-center gap-2.5 transition-all duration-300 shadow-md hover:-translate-y-0.5 interactive ${
                      selectedNodeId === "wazuh"
                        ? "bg-rose-950/40 border-rose-500 text-white scale-105 shadow-rose-500/20 ring-1 ring-rose-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-rose-500 animate-pulse" />
                    <div className="text-left">
                      <div className="font-bold text-[11px] leading-tight">Wazuh SIEM</div>
                      <div className="text-[9px] text-slate-500 font-normal">wazuh-agent-manager</div>
                    </div>
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom tooltip alert */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-xl">
              <Info className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="font-sans leading-relaxed">
                Click any node in the topology layout to extract specific telemetry parameters, virtual disk specs, and security configurations on the audit log terminal panel.
              </span>
            </div>
          </div>

          {/* Right panel: Spec & Info panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border-white/5 relative shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Node Metadata header */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold text-accent">
                    <span>LAYER: {selectedNode.category}</span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl text-white">
                    {selectedNode.name}
                  </h4>
                  <div className="text-xs font-mono text-slate-400">
                    SPECIFICATION: <span className="text-white font-semibold">{selectedNode.spec}</span>
                  </div>
                </div>

                {/* Brief Narrative */}
                <p className="text-slate-400 text-sm font-sans leading-relaxed border-t border-slate-800/80 pt-4">
                  {selectedNode.description}
                </p>

                {/* Core Parameters list */}
                <div className="space-y-3 pt-4 border-t border-slate-800/60">
                  <h5 className="text-[11px] font-mono text-slate-400 font-bold tracking-wider">
                    AUDIT TELEMETRY CONFIGURATION:
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedNode.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-slate-300 font-sans">
                        <span className="text-accent mt-0.5">•</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Simulated Live Console Logs at the very bottom */}
            <div className="mt-8 border-t border-slate-800/80 pt-6">
              <div className="font-mono text-[10px] p-3 rounded-lg bg-slate-950 border border-slate-900 text-slate-500 space-y-1">
                <div className="text-emerald-400">&gt; querying telemetry {selectedNode.id}... OK</div>
                <div>&gt; status: 200 connection authorized</div>
                <div className="flex items-center gap-1 text-slate-400 font-semibold animate-pulse">
                  <span>&gt; sys_channel: listen_stable_state</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
