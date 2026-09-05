export interface Skill {
  name: string;
  level: number; // percentage (0-100)
}

export interface SkillCategory {
  title: string;
  icon: string; // lucide icon name
  skills: Skill[];
}

export interface HighlightItem {
  text: string;
  icon?: string;
}

export interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string; // local svg graphic details or mock image background
  githubUrl?: string;
  demoUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badgeColor: string; // for custom stylized badge gradients
  icon: string; // lucide icon name
  id: string;
  verificationUrl?: string;
  category?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  snippet: string;
  content: string;
  image: string;
}
