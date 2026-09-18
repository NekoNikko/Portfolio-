import { readFileSync } from "node:fs";
import { join } from "node:path";

interface SiteContent {
  currentlyBuilding?: Record<string, unknown>;
  engineeringUpdates?: unknown;
}

export interface GeneratedContent {
  contentType: "CURRENT_BUILD" | "ENGINEERING_UPDATE";
  sourceReference: string;
  sourceType: "manual";
  content: Record<string, unknown>;
}

function readSiteContent(): SiteContent {
  const path = join(
    process.cwd(),
    "public-content",
    "site.json"
  );

  return JSON.parse(
    readFileSync(path, "utf8")
  ) as SiteContent;
}

export function extractCurrentBuild():
  | GeneratedContent
  | null {
  const site = readSiteContent();

  if (!site.currentlyBuilding) {
    return null;
  }

  return {
    contentType: "CURRENT_BUILD",
    sourceReference: "public-content/site.json",
    sourceType: "manual",
    content: {
      id: "current-build-1",
      ...site.currentlyBuilding,
    },
  };
}

export function extractEngineeringUpdates():
  GeneratedContent[] {
  const site = readSiteContent();

  if (!Array.isArray(site.engineeringUpdates)) {
    return [];
  }

  return site.engineeringUpdates
    .filter(
      (item): item is Record<string, unknown> =>
        item !== null &&
        typeof item === "object" &&
        !Array.isArray(item)
    )
    .map((content) => ({
      contentType: "ENGINEERING_UPDATE",
      sourceReference: "public-content/site.json",
      sourceType: "manual",
      content,
    }));
}