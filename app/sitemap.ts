import type { MetadataRoute } from "next";
import { getProjects, getJournal, getCaseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/projects",
    "/journal",
    "/case-studies",
    "/skills",
    "/how-i-work",
    "/about",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const projectRoutes = getProjects().map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: p.lastUpdated ? new Date(p.lastUpdated) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = getJournal().map((j) => ({
    url: absoluteUrl(`/journal/${j.slug}`),
    lastModified: new Date(j.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const caseStudyRoutes = getCaseStudies().map((c) => ({
    url: absoluteUrl(`/case-studies/${c.slug}`),
    lastModified: c.date ? new Date(c.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes, ...caseStudyRoutes];
}