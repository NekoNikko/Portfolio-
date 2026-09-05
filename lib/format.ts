const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format an ISO date (YYYY-MM-DD) as "September 5, 2026". */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const m = Number(month) - 1;
  const d = Number(day);
  if (m < 0 || m > 11 || d < 1 || d > 31) return iso;
  return `${MONTHS[m]} ${d}, ${year}`;
}

/** Format an ISO date as "YYYY-MM-DD" (safe fallback for machine contexts). */
export function isoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : iso;
}