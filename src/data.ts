import { SkillCategory, TimelineItem, Project, Certification, Testimonial, BlogPost } from "./types";

export const personalInfo = {
  name: "Marlon T. Argente",
  title: "IT Specialist & Software Support Engineer",
  experienceYears: 15,
  location: "Tayabas City, Quezon, Philippines, 4327",
  email: "argente.marlon@gmail.com",
  phone: "+63 966-2247-402",
  github: "https://github.com/marlonargente",
  linkedin: "https://linkedin.com/in/marlonargente",
  resumeUrl: "#",
  bio: "Highly accomplished IT Specialist and Software Support Engineer with over 15 years of comprehensive experience managing enterprise IT infrastructure, digital laboratories, and asset systems across government and academic institutions. Proven expertise in full-stack hardware diagnostics, Windows Server administration, network deployment, and rigorous asset auditing compliant with ISO quality standards. Adept at managing large-scale data integrity operations, resolving complex software architecture bottlenecks, and enforcing organizational cybersecurity practices.",
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "100+", label: "Projects Supported" },
    { value: "35", label: "Schools Audited" },
    { value: "100%", label: "Data Integrity Rating" }
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Systems & Server Administration",
    icon: "Server",
    skills: [
      { name: "Windows Server 2022", level: 95 },
      { name: "Active Directory / GPO", level: 95 },
      { name: "DHCP & DNS Management", level: 92 },
      { name: "Virtualization (Hyper-V / Proxmox)", level: 90 },
      { name: "User Access Control", level: 93 },
      { name: "Permission Management", level: 94 }
    ]
  },
  {
    title: "Network & Infrastructure Engineering",
    icon: "Network",
    skills: [
      { name: "LAN/WAN/WISP Deployment", level: 92 },
      { name: "Network Performance Monitoring", level: 90 },
      { name: "CCTV Security Systems", level: 88 },
      { name: "Biometric System Config", level: 85 },
      { name: "Hardware Configuration", level: 92 },
      { name: "Cloudflare Tunnels", level: 90 }
    ]
  },
  {
    title: "Asset Lifecycle & Supply Chain",
    icon: "Briefcase",
    skills: [
      { name: "Fixed-Asset Auditing", level: 94 },
      { name: "Stock Inventory Control", level: 93 },
      { name: "Procurement Logistics", level: 88 },
      { name: "Supply Chain Documentation", level: 91 },
      { name: "ISO Compliance Auditing", level: 89 }
    ]
  },
  {
    title: "IT Support & Disaster Recovery",
    icon: "Cpu",
    skills: [
      { name: "Hardware & Software Lifecycle", level: 95 },
      { name: "Advanced Fault Diagnostics", level: 94 },
      { name: "System Imaging & Formatting", level: 92 },
      { name: "Backup Systems (Veeam/PBS)", level: 91 },
      { name: "Data Recovery Operations", level: 88 }
    ]
  },
  {
    title: "Cybersecurity & Automation",
    icon: "Shield",
    skills: [
      { name: "Network Security Monitoring", level: 90 },
      { name: "Incident Response", level: 86 },
      { name: "Threat Detection (SIEM)", level: 85 },
      { name: "Python Scripting & Automation", level: 88 },
      { name: "AI Assist Software Dev", level: 85 }
    ]
  }
];

export const timelineData: TimelineItem[] = [
  {
    role: "ICT Support Staff (Contract of Service)",
    company: "Department of Education Tayabas",
    period: "February 2026 – May 2026",
    description: "Spearheaded the technical validation and data audit of ICT infrastructure and internet connectivity baselines across 35 regional schools, driving compliance for educational resource allocation.",
    highlights: [
      "Spearheaded the technical validation and data audit of ICT infrastructure and internet connectivity baselines across 35 regional schools, driving compliance for educational resource allocation.",
      "Automated administrative workflows by developing and deploying ad hoc low-code web applications, digital monitoring tracking forms, and dynamic data spreadsheets via Looker Studio.",
      "Consolidated complex technical reports for the Information Technology Officer (ITO), ensuring 100% data integrity and strict confidentiality under strict government compliance standards."
    ]
  },
  {
    role: "IT Specialist / Property Assistant / Digital Laboratory Technician II",
    company: "AMA Computer College Inc. (Lucena)",
    period: "July 2022 – January 2026",
    description: "Directed operational maintenance for campus-wide digital laboratories while executing double duties as the Lead Technical Property Officer.",
    highlights: [
      "Directed operational maintenance for campus-wide digital laboratories while executing double duties as the Lead Technical Property Officer.",
      "Streamlined the logistics lifecycle by auditing incoming vendor supplies against delivery receipts, establishing robust gate pass protocols, and maintaining real-time stock cards.",
      "Formulated and executed the annual fixed-asset physical inventory audits of all high-value electronics, computer hardware, tools, and consumable materials.",
      "Orchestrated technical environment staging, network readiness, and equipment provisioning for high-stakes academic events, thesis presentations, and professional seminars."
    ]
  },
  {
    role: "IT Specialist / Property Assistant / Digital Laboratory Technician I",
    company: "AMA Computer College Inc. (Lucena)",
    period: "February 2018 – July 2022",
    description: "Managed central laboratory server configurations and resolved high-tier technical infrastructure problems for over 100 concurrent campus workstation users.",
    highlights: [
      "Managed central laboratory server configurations and resolved high-tier technical infrastructure problems for over 100 concurrent campus workstation users.",
      "Eliminated critical network bottlenecks by continuously tracking Local Area Network (LAN) performance, preventing service drops, and optimizing server access routines.",
      "Safeguarded institutional files by establishing routine system-wide backups, complete hard disk sanitization/formatting, and system re-imaging schedules.",
      "Maintained lab security, physical cleanliness, and tool control, while running deep anti-malware and virus remediation scans via native disk utilities."
    ]
  },
  {
    role: "IT Specialist",
    company: "AMA Computer College Inc. (Lucena)",
    period: "August 2017 – February 2018",
    description: "Designed and deployed robust physical network wiring layouts and hardware infrastructure for college expansions.",
    highlights: [
      "Designed and deployed robust physical network wiring layouts and hardware infrastructure for the expansion of College and Senior High School departments.",
      "Evaluated corporate technical requirements and recommended optimized commercial software suites to align campus business and educational processes."
    ]
  },
  {
    role: "Software Support Engineer",
    company: "AMA Computer College Inc. (Lucena)",
    period: "November 2012 – August 2017",
    description: "Troubleshot and resolved complex enterprise software application issues, maximizing system uptime and operational productivity.",
    highlights: [
      "Troubleshot and resolved complex enterprise software application issues, maximizing system uptime and operational productivity.",
      "Administered core database security profiles, user directories, and precise read/write access privileges within the centralized campus Enrollment System.",
      "Oversaw the deployment and corporate user onboarding of newly developed in-house software architectures.",
      "Governed strict license compliance and documentation records for all active software platforms, guaranteeing 100% vendor compliance.",
      "Designed and facilitated technical training seminars, ensuring rapid adoption of productivity tools among teaching and administrative faculty members."
    ]
  },
  {
    role: "IT cum Laboratory Technician",
    company: "AMA Computer College Inc. (Lucena)",
    period: "June 2010 – March 2012",
    description: "Preserved hardware lifespan across multiple student computer labs by conducting internal electronic component dusting and preventive maintenance.",
    highlights: [
      "Preserved hardware lifespan across multiple student computer labs by conducting internal electronic component dusting, preventive maintenance, and component upgrades.",
      "Administered the Computer Time Request (CTR) booking queue to maintain an orderly lab footprint during high-density operating periods."
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Windows Server Infrastructure",
    category: "Infrastructure",
    description: "Enterprise grade deployment of Windows Server 2022 domain controller cluster.",
    fullDescription: "A full-scale architecture design and installation of Windows Server 2022 Active Directory Domain Services (AD DS). This project involved clustering Domain Controllers for high-availability, setting up redundant DNS/DHCP servers, and creating granular Group Policy Objects (GPOs) to control over 500 endpoint machines. It features optimized secure authentication mechanisms, automated credential rotational cycles, and centralized backup storage.",
    technologies: ["Windows Server 2022", "Active Directory", "DNS", "DHCP", "GPO", "Hyper-V"],
    image: "server"
  },
  {
    id: "proj-2",
    title: "Active Directory Deployment",
    category: "Infrastructure",
    description: "Unified identity, authentication and access management system for high user loads.",
    fullDescription: "A comprehensive restructuring of an existing Active Directory forest to achieve enterprise role-based access control (RBAC). Implemented secure organizational units (OUs), dynamic distribution groups, automated user provisioning scripts using PowerShell, and rigorous audit trails. This setup secured student and staff logins across campuses and streamlined access permissions.",
    technologies: ["Active Directory", "PowerShell", "LDAP", "Group Policy", "Windows Server"],
    image: "folder-tree"
  },
  {
    id: "proj-3",
    title: "Network Infrastructure Design",
    category: "Networking",
    description: "Highly secure and optimized VLAN topology managed by pfSense firewalls.",
    fullDescription: "Design and deployment of a multi-VLAN network topology utilizing smart managed switches and a custom pfSense security gateway. Created segregated networks for Administration, Student Labs, Guest Wi-Fi, and server systems. Implemented Traffic Shaping/QoS for high-quality video calling and educational tools, along with Multi-WAN load balancing and failover.",
    technologies: ["pfSense", "VLAN", "MikroTik", "Cisco", "QoS", "Load Balancing"],
    image: "network"
  },
  {
    id: "proj-4",
    title: "Python Automation Scripts",
    category: "Programming",
    description: "Custom scripts for automated data validation and report aggregation.",
    fullDescription: "A collection of production automation scripts engineered in Python. Tasks include automated parsing of school audit spreadsheets, generation of unified administrative PDF reports, automatic system backup monitoring, and notification triggers sent directly to Telegram channels upon system anomalies. These scripts eliminated over 15 hours of manual, repetitive office work weekly.",
    technologies: ["Python", "Pandas", "PyPDF", "REST APIs", "Cron", "Git"],
    image: "terminal"
  },
  {
    id: "proj-5",
    title: "Inventory Management System",
    category: "Programming",
    description: "A robust, responsive web-based ICT asset and license tracker.",
    fullDescription: "A fully custom web application designed to catalog hardware assets, check status logs, and manage software license expirations. Features a clean, dashboard interface with low-latency search capabilities, dynamic qr-code generations for hardware tagging, and automatic email notifications warning administrators of upcoming license expirations.",
    technologies: ["PHP", "JavaScript", "MySQL", "Tailwind CSS", "HTML5", "QR Code API"],
    image: "database"
  },
  {
    id: "proj-6",
    title: "Cybersecurity Security Lab",
    category: "Cybersecurity",
    description: "Intrusion detection and real-time log analysis cluster.",
    fullDescription: "An advanced cybersecurity lab utilizing Wazuh SIEM for unified security monitoring. Standardized agents were deployed across target VMs to aggregate audit logs, detect malicious processes, verify system file integrity, and monitor vulnerabilities. Set up custom alerting configurations to detect and log simulated brute force and malware attacks immediately.",
    technologies: ["Wazuh", "SIEM", "Threat Detection", "Linux", "Docker", "ELK Stack"],
    image: "shield"
  },
  {
    id: "proj-7",
    title: "Proxmox VE Home Lab",
    category: "Cybersecurity",
    description: "Highly redundant virtualization platform for sandboxing educational and IT tools.",
    fullDescription: "A home virtualization cluster deployed on Proxmox VE, hosting sandboxed networks, specialized firewalls, and lightweight Linux containers. Standardized storage backups are linked to a local NAS storage utilizing Proxmox Backup Server (PBS) with efficient global block deduplication and end-to-end encryption.",
    technologies: ["Proxmox VE", "PBS", "Ceph Storage", "Linux Containers", "OpenVSwitch"],
    image: "cpu"
  },
  {
    id: "proj-8",
    title: "Cloudflare Tunnel + MeshCentral",
    category: "Networking",
    description: "Secure, remote workstation agent access without VPN overhead or port forwarding.",
    fullDescription: "Secure administration infrastructure connecting off-network systems to a centralized MeshCentral management console. Utilized Cloudflare Tunnels (cloudflared) to proxy HTTPS traffic securely behind firewall NAT boundaries, bypassing port-forwarding requirements completely and enforcing Cloudflare Access MFA restrictions.",
    technologies: ["Cloudflare Tunnels", "MeshCentral", "MFA", "Reverse Proxy", "Security Protocols"],
    image: "globe"
  },
  {
    id: "proj-9",
    title: "Hydroponics Monitoring Dashboard",
    category: "Programming",
    description: "IoT climate and nutrient monitoring dashboard leveraging Python and modern frontend tools.",
    fullDescription: "An innovative, environmental IoT monitoring system tailored for hydroponics. Sensor telemetry data (pH, electrical conductivity, water level, air temperature) is read by Python microcontrollers and streamed to a central server dashboard. The dashboard charts historical parameters and triggers system notifications if metrics exit target optimal bands.",
    technologies: ["Python", "React", "Tailwind CSS", "IoT Sensors", "WebSockets", "D3.js"],
    image: "trending-up"
  },
  {
    id: "proj-10",
    title: "School Laboratory Management",
    category: "Infrastructure",
    description: "Multi-seat terminal restoration and centralized software distribution platform.",
    fullDescription: "An optimized operating system restoration environment designed for school laboratories. Deployed centralized OS cloning services (Clonezilla/FOG Project) allowing over 40 computers in a lab to be completely restored to pristine clean states in under 15 minutes. Included automated registry patches to lock student accounts and prevent system files alteration.",
    technologies: ["FOG Project", "Clonezilla Server", "PXE Boot", "NFS/TFTP", "Shell Scripting"],
    image: "monitor"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google (via Coursera)",
    date: "Jan 2024",
    badgeColor: "from-blue-600 via-indigo-600 to-cyan-500",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/professional-cert/Y54MATQQ5CXA",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c1",
    title: "Foundations of Cybersecurity",
    issuer: "Google (via Coursera)",
    date: "Jan 1, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/5ANLVZNCP93G",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c2",
    title: "Play It Safe: Manage Security Risks",
    issuer: "Google (via Coursera)",
    date: "Jan 1, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/T4QEUT3S2F2A",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c3",
    title: "Connect and Protect: Networks and Network Security",
    issuer: "Google (via Coursera)",
    date: "Jan 3, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/HJVVQEP5DRPG",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c4",
    title: "Tools of the Trade: Linux and SQL",
    issuer: "Google (via Coursera)",
    date: "Jan 5, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/HJJHY8WESM9S",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c5",
    title: "Assets, Threats, and Vulnerabilities",
    issuer: "Google (via Coursera)",
    date: "Jan 5, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/X84Y54MSSJNH",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c6",
    title: "Sound the Alarm: Detection and Response",
    issuer: "Google (via Coursera)",
    date: "Jan 5, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/FJUSC96PNDYG",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c7",
    title: "Automate Cybersecurity Tasks with Python",
    issuer: "Google (via Coursera)",
    date: "Jan 6, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/BPXW4SJ9V5T3",
    category: "Google Cybersecurity"
  },
  {
    id: "google-cyber-c8",
    title: "Put It to Work: Prepare for Cybersecurity Jobs",
    issuer: "Google (via Coursera)",
    date: "Jan 6, 2024",
    badgeColor: "from-blue-500 to-sky-600",
    icon: "Shield",
    verificationUrl: "https://coursera.org/verify/VGBTY8FCYSLW",
    category: "Google Cybersecurity"
  },
  {
    id: "lil-cyber-path",
    title: "Become a Cybersecurity Professional (Learning Path)",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-indigo-600 to-violet-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/6dfcb8fbc2d3a32aba968f358496fb95c416f997189b03990dff5e4a6e0b6e5c",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-cyber-foundations",
    title: "Cybersecurity Foundations (2020)",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-indigo-500 to-blue-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/59595f75a505c1da73f8d9ba15e520e6e1b406c93be9580fc6a3f06138042d59",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-cyber-job",
    title: "Land Your First Cybersecurity Job",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-indigo-500 to-purple-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/bb902064c1efd0f53058b45e68e09b9a5f0eb938ed682aa1183bec88053d0926",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-cyber-owasp",
    title: "Learning the OWASP Top 10",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-red-500 to-rose-600",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/350c4be7a764458cce0f1f0e4c02a32ba0a46e57adcd32d776db779d9479f170",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-cyber-landscape",
    title: "The Cybersecurity Threat Landscape",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-violet-500 to-pink-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/e7d560c6d4c0cbab06f1f78f1b0391d55cf268e1b01c6ab101e99c7fc2b3f734",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-win-2022-path",
    title: "Getting Started with Windows Server 2022 (Learning Path)",
    issuer: "LinkedIn Learning",
    date: "Feb 3, 2023",
    badgeColor: "from-violet-600 to-fuchsia-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/74e25b7cce6dad97975e0c474a73fa579b6b6b3384457125787f1819ec96c637",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-win-dns",
    title: "Windows Server 2022: DHCP and DNS",
    issuer: "LinkedIn Learning",
    date: "Feb 3, 2023",
    badgeColor: "from-violet-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/8eb50cf249e7393a36d3a4265743724c60dee022825d1d69e91d7d6b230005cd",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-win-essential",
    title: "Windows Server 2022 Essential Training",
    issuer: "LinkedIn Learning",
    date: "Feb 3, 2023",
    badgeColor: "from-violet-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/226d33a75db01f7af3ae435b006949eb4a6cd71ff35d192aba819984314aae2c",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-win-ad",
    title: "Windows Server 2022: Install and Configure Active Directory",
    issuer: "LinkedIn Learning",
    date: "Feb 3, 2023",
    badgeColor: "from-violet-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/40d38e49454024cfe2b208f0049b258d26abc1ffae36d9219a0be04e31e06df5",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-win-config",
    title: "Windows Server 2022: Installation and Configuration",
    issuer: "LinkedIn Learning",
    date: "Feb 3, 2023",
    badgeColor: "from-violet-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/bf96a8f948dfce57eb7e583953aac129d355bb7fc4a3b0cd65c7d6f59eddca1c",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-ccp1",
    title: "AWS Certified Cloud Practitioner (CLF-C01) Cert Prep: 1 Cloud Concepts",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-sky-500 to-blue-600",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/2afbf9bbedee5b42468795e1ff165f282231f7bc6804d84a40bd0c03e9f9e6ad",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-ccp2",
    title: "AWS Certified Cloud Practitioner (CLF-C01) Cert Prep: 2 Security",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-sky-500 to-blue-600",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/aeb7f79ff3af8ff865c3b3c7eb46e5fe3f4b85d2e0bcb5e063b6238cd34ab693",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-ccp3",
    title: "AWS Certified Cloud Practitioner (CLF-C01) Cert Prep: 3 Core Services",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-sky-500 to-blue-600",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/419ae11ab3d8c172ecb5ebe4c226c820231df91bb7a1061ed941ec5ed5ea02b5",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-ccp4",
    title: "AWS Certified Cloud Practitioner (CLF-C01) Cert Prep: 4 Billing and Pricing",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-sky-500 to-blue-600",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/086284aa1e982029f71834c41ed9131d4a2ad1b7823102912a0856ba17795e04",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-prep-path",
    title: "Prepare for the AWS Certified Cloud Practitioner Certification Exam (Learning Path)",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-blue-600 to-indigo-600",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/050f4f6e82e1434a798085266efae2fae82f7c3639e06d2492bea4454b2a621b3",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-agile-transform",
    title: "Agile Software Development: Transforming Your Organization (2019)",
    issuer: "LinkedIn Learning",
    date: "Jan 22, 2023",
    badgeColor: "from-purple-500 to-pink-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/26730cd943e227d298f934eb75358180a9d0cc7c3cb7d59d0b6f6cad1d139c79",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-agile-dev",
    title: "Agile Software Development",
    issuer: "LinkedIn Learning",
    date: "Jan 22, 2023",
    badgeColor: "from-purple-500 to-pink-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/066a15e370e6f24aab29ff8564b602c14ebab1208cc3a911aac8872b3cde9a47",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-agile-path",
    title: "Applying Lean, DevOps, and Agile to Your IT Organization",
    issuer: "LinkedIn Learning",
    date: "Jan 24, 2023",
    badgeColor: "from-purple-600 to-pink-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/53ff110398703da3a5f73227586d21f4d50b3d092825d1d69e91d7d6b230005cd",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-devops-lean",
    title: "DevOps Foundations: Lean and Agile",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-purple-500 to-fuchsia-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/55ea3af87b0c953af33bf149c962ba062f3d5c8387ec4c41eeae4c639da6fdc7",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-devops-transform",
    title: "DevOps Foundations: Transforming the Enterprise",
    issuer: "LinkedIn Learning",
    date: "Jan 23, 2023",
    badgeColor: "from-purple-500 to-fuchsia-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/feffd7c00f9618358f78aa7db490c349b7751f57295a51aa43f96e423f995204",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-lean-foundations",
    title: "Lean Foundations",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-purple-500 to-violet-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/8909c070efe0c10c6d724ed27229b9cd41cb8f537e959a6ef06dd9f650e20b9f",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-lean-teams",
    title: "Lean Technology Strategy: Building High-Performing Teams",
    issuer: "LinkedIn Learning",
    date: "Jan 24, 2023",
    badgeColor: "from-purple-500 to-indigo-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/03b132fd01e9b6bc9a19dfd59dbfec74f35e0f926d617e79d110d5e2c26b4e65",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-lean-constraints",
    title: "Lean Technology Strategy: Moving Fast With Defined Constraints",
    issuer: "LinkedIn Learning",
    date: "Jan 24, 2023",
    badgeColor: "from-purple-500 to-indigo-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/04cc53ec1c1bf1a17a2f5b1087b55f1f1f7eed70ddc8848e3f9cbdc3c4fa7ddb",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-lean-scale",
    title: "Lean Technology Strategy: Running Agile at Scale",
    issuer: "LinkedIn Learning",
    date: "Jan 23, 2023",
    badgeColor: "from-purple-500 to-indigo-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/41b3b5e08efa0844ade9cf6fdf078fabce07956ccebd27917c71924c0eb81970",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-lean-transform",
    title: "Lean Technology Strategy: Starting Your Business Transformation",
    issuer: "LinkedIn Learning",
    date: "Jan 24, 2023",
    badgeColor: "from-purple-500 to-indigo-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/3412d308cce7956338fab81c67dd85de02bcb93e3cc61d813cdc1e58d156b2d3",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-sec-threats",
    title: "CompTIA Security+ (SY0-601) Cert Prep: 1 Threats, Attacks, and Vulnerabilities",
    issuer: "LinkedIn Learning",
    date: "Feb 6, 2023",
    badgeColor: "from-red-600 to-orange-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/da89626d3a84636cc4ba9a2b708af675a1363a8a784cc828326a035f20b0b8c6",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-sec-code",
    title: "CompTIA Security+ (SY0-601) Cert Prep: 2 Secure Code Design and Implementation",
    issuer: "LinkedIn Learning",
    date: "Feb 8, 2023",
    badgeColor: "from-red-600 to-orange-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/1c8074c5590eff34f3a5d2fa06b090ab55be1594d5b0a9ddbaee9345c40bcd6f",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-sec-crypto",
    title: "CompTIA Security+ (SY0-601) Cert Prep: 3 Cryptography Design and Implementation",
    issuer: "LinkedIn Learning",
    date: "Feb 13, 2023",
    badgeColor: "from-red-600 to-orange-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/abb92321d308fd0dcd553c2d382ee66cbd15a65fa85ace844978085a25135bba",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-sec-tips",
    title: "Exam Tips: CompTIA Security+ (SY0-601)",
    issuer: "LinkedIn Learning",
    date: "Feb 6, 2023",
    badgeColor: "from-red-500 to-rose-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/8a3304d308111cad6a419479dd92aa128260340d55858b01bf9a0a8369ffaf0f",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-itil-look",
    title: "ITIL® Foundation 4 First Look",
    issuer: "LinkedIn Learning",
    date: "Feb 4, 2023",
    badgeColor: "from-emerald-500 to-teal-600",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/8497b8eb3f77f8dd7b0386d744d37a6337ae3648f9a3323a3ac3cf5aa84556f8",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-itil-practice",
    title: "Putting ITIL® Into Practice: Applying ITIL® 4 Foundation Concepts",
    issuer: "LinkedIn Learning",
    date: "Feb 4, 2023",
    badgeColor: "from-emerald-500 to-teal-600",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/2b232ffc0627c98d74d2826e48f8fb1c2c03571642a3cd07ee512216cc35a9d6",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-m365-admin",
    title: "Microsoft 365 Essential Training for Administrators (2021)",
    issuer: "LinkedIn Learning",
    date: "Jan 25, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/15ddc2f389c7ee93818e024c68a4457125787f1819ec96c637",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-azure-cc1",
    title: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts",
    issuer: "LinkedIn Learning",
    date: "Jan 26, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/3d48869212b17568f40fb3b1c594717ad851e57e8d243167b2a52eb84da416ef",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-azure-cc2",
    title: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and Security",
    issuer: "LinkedIn Learning",
    date: "Jan 27, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/f7635a2dda146f8e6e7acf298b761636527a9ccfa21e12704eef1d7bebf00f64",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-azure-portal",
    title: "Azure Management: Portal, PowerShell, and CLI Basics",
    issuer: "LinkedIn Learning",
    date: "Jan 28, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Server",
    verificationUrl: "https://www.linkedin.com/learning/certificates/c571296e87d1ce5c18479e6cbef464bf6b7aef7123c49adb75104f3b7e2dcdbd",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-azure-netsec",
    title: "Azure Network Security for Beginners: Tools and Services",
    issuer: "LinkedIn Learning",
    date: "Jan 28, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/6c75fca49df7e709d37959a109faa87fa5214c61e33b8321cd43d24e54803925",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-aws-serverless",
    title: "Cloud Native Projects: AWS Serverless",
    issuer: "LinkedIn Learning",
    date: "Jan 21, 2023",
    badgeColor: "from-orange-500 to-rose-500",
    icon: "Cpu",
    verificationUrl: "https://www.linkedin.com/learning/certificates/83b9ce3a166d8f6b144ff737b47c1e18f82e344ccba91442bed0a0d94c168d46",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-sec-careers",
    title: "IT Security Careers and Certifications: First Steps",
    issuer: "LinkedIn Learning",
    date: "Feb 7, 2023",
    badgeColor: "from-violet-500 to-indigo-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/3add731acf758152b7cc29272f877f55e8b11fe3618de0e75a7707bde5ea2ab8",
    category: "LinkedIn Learning"
  },
  {
    id: "lil-entra-basics",
    title: "Microsoft Entra ID: Basics",
    issuer: "LinkedIn Learning",
    date: "Jan 28, 2023",
    badgeColor: "from-sky-500 to-indigo-500",
    icon: "Shield",
    verificationUrl: "https://www.linkedin.com/learning/certificates/12cc03d8d8b4cd25983e825a7a1951791df61d34eede11f6e8ffdae20ad3d478",
    category: "LinkedIn Learning"
  },
  {
    id: "gov-csc",
    title: "Professional Career Service Eligibility",
    issuer: "Civil Service Commission, Philippines (Rating: 80.3)",
    date: "2012",
    badgeColor: "from-amber-500 to-orange-600",
    icon: "Award",
    category: "Government Eligibility"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    name: "Dr. Roberto Santos",
    role: "Campus Director",
    company: "AMA Computer College",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    content: "Marlon's commitment to our IT operations was legendary. For 16 years, our computer labs stayed consistently online, and our systems ran without major incident. He possesses a rare combination of hardware expertise, scripting, and extreme reliability."
  },
  {
    name: "Elena Marasigan",
    role: "Senior IT Education Specialist",
    company: "Schools Division Office of Tayabas",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    content: "Marlon's performance while validating school computer labs was spectacular. His detailed technical reports pinpointed critical security lapses in various networks and outlined clear remediation pathways that significantly improved our digital readiness."
  },
  {
    name: "Michael Torres",
    role: "Infrastructure Consultant",
    company: "Velocti Systems",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
    content: "Marlon is a true professional with deep Windows Server and virtualization expertise. The Active Directory reorganization project he completed for his institute is a case study of excellent role-based access design."
  }
];

export const blogPostsData: BlogPost[] = [
  {
    title: "Hardening Active Directory: GPO Best Practices for Public Sector IT",
    category: "Cybersecurity",
    date: "May 24, 2026",
    readTime: "8 min read",
    snippet: "A deep dive into restricting privilege escalation, setting secure password policies, and automating compliance monitoring in Windows Server using AD Group Policy Objects.",
    content: "Windows Active Directory is the heart of most organizational IT infrastructure, making it a primary target for malicious actors. In public sector settings where resources are lean, standard GPOs must be optimized. In this article, we outline crucial techniques for AD hardening, including blocking NTLM fallbacks, restricting local administrator groups through Restricted Groups, securing Domain Controller paths, and creating automated GPO backup cycles with PowerShell. We also cover how to implement defensive network barriers so that compromised endpoints cannot access AD resources.",
    image: "shield"
  },
  {
    title: "Transitioning to Virtualization: Setting up Proxmox VE + PBS for Redundancy",
    category: "Windows Server",
    date: "April 12, 2026",
    readTime: "10 min read",
    snippet: "Step-by-step guide on consolidating legacy bare-metal school servers into high-performance Proxmox hypervisors backed by encrypted global deduplication.",
    content: "Migrating bare-metal legacy systems to virtualized environments yields outstanding cost savings and uptime improvements. In this guide, we detail our migration of server workloads to Proxmox VE. We cover optimal VM CPU type selection, thin-provisioned LVM setups, pfSense firewall integration to restrict inter-VM traffic, and linking the host cluster to Proxmox Backup Server (PBS). PBS provides incredible deduplication ratios, reducing daily backup sizes down to a fraction of the baseline, while verifying filesystem integrity continuously.",
    image: "server"
  },
  {
    title: "Secure Remotes: Exposing Enterprise Portals with Cloudflare Tunnels",
    category: "Networking",
    date: "March 08, 2026",
    readTime: "6 min read",
    snippet: "Bypass firewall limits and port-forwarding constraints safely while securing remote asset management portals behind multi-factor authentication.",
    content: "Exposing school administration and remote asset monitoring consoles (like MeshCentral) normally involves dangerous port forwarding and DNS tracking. Cloudflare Tunnels provide an elegant, secure alternative. By deploying the lightweight cloudflared daemon locally, you can create a secure outbound connection to Cloudflare edge networks. This article reviews configuring the configuration.yml, securing backend SSL, mapping internal IP addresses, and enforcing Cloudflare Access policies so that only verified domains can reach the remote console login screen.",
    image: "globe"
  },
  {
    title: "Python-Based CSV/PDF Automation for Infrastructure Audits",
    category: "Python Automation",
    date: "January 15, 2026",
    readTime: "5 min read",
    snippet: "How a single Python script saved 15+ hours weekly by automatically parsing network validation records and synthesizing beautiful government-compliant PDF files.",
    content: "Manual processing of audit spreadsheets from dozens of public school labs is highly prone to errors and takes hours. With Python, this process can be fully automated. This post demonstrates a complete workflow utilizing Python's Pandas library to read survey CSV sheets, run data validation, spot hardware inventory deficits, and output formatted, government-ready PDF reports with ReportLab. We also detail linking a lightweight Telegram API bot to broadcast critical alerts directly to technical coordinators.",
    image: "terminal"
  }
];

export const techStackFloating = [
  { name: "Windows Server", level: "Enterprise", category: "OS/Server" },
  { name: "Active Directory", level: "Expert", category: "Directory" },
  { name: "Azure", level: "Cloud", category: "Cloud" },
  { name: "AWS", level: "Cloud", category: "Cloud" },
  { name: "Python", level: "Advanced", category: "Scripting" },
  { name: "GitHub", level: "DevOps", category: "DevOps" },
  { name: "Docker", level: "Containers", category: "Virtualization" },
  { name: "Linux", level: "Expert", category: "OS/Server" },
  { name: "VMware", level: "Virtualization", category: "Virtualization" },
  { name: "Proxmox", level: "Expert", category: "Virtualization" },
  { name: "MySQL", level: "Advanced", category: "Database" },
  { name: "PowerShell", level: "Advanced", category: "Scripting" },
  { name: "Cloudflare", level: "Expert", category: "Networking" },
  { name: "Cisco", level: "Advanced", category: "Networking" },
  { name: "MikroTik", level: "Advanced", category: "Networking" }
];

export const educationData = {
  degree: "Bachelor of Science in Information Technology",
  institution: "AMA Computer College, Lucena City, Philippines",
  year: "2010"
};

export const referencesData = [
  {
    name: "Mark Brayan F. Valencia",
    role: "IT Officer I",
    organization: "SDO Tayabas",
    contact: "0917-637-7545"
  },
  {
    name: "Daria Par Hughes",
    role: "Branch Head",
    organization: "ABE Lucena",
    contact: "0917-793-2776"
  },
  {
    name: "Rose Ann Eclavea",
    role: "OIC DEAN",
    organization: "AMA Lucena",
    contact: "0905-635-1480"
  }
];
