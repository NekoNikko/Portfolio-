// Public portfolio configuration — server-side environment access.
//
// No secrets live in this file or anywhere in the client bundle. The public
// site only needs a base URL + port; everything else defaults so the app runs
// on localhost with zero configuration.

export function publicBaseUrl(): string {
  const raw = process.env.PUBLIC_BASE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "http://localhost:3000";
}

export function port(): number {
  const raw = process.env.PORT?.trim();
  if (!raw) return 3000;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
}

/** Absolute URL for a site path, e.g. /projects → http://localhost:3000/projects */
export function absoluteUrl(path: string): string {
  const base = publicBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}