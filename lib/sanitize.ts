// Publication safety layer (spec §11).
//
// Scans candidate content for sensitive material before it can be approved
// for publication: API keys, passwords, tokens, private keys, email/phone
// numbers, internal IPs, internal hostnames, filesystem paths, credentials.
//
// Two modes:
//   scanSensitive()  — report violations (used by the queue review UI)
//   redactSensitive()— replace matches with [REDACTED] (used by imports)
//
// The OWNER_EMAIL allowlist keeps the portfolio's own contact address from
// being flagged when it legitimately appears in content.

export interface SensitiveViolation {
  category: string;
  matches: string[];
}

export interface SensitiveScanResult {
  clean: boolean;
  count: number;
  violations: SensitiveViolation[];
}

const OWNER_EMAILS = ["argente.marlon@gmail.com"];

type Pattern = { category: string; re: RegExp };

const PATTERNS: Pattern[] = [
  { category: "API key", re: /\b(sk-[A-Za-z0-9]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|gh[pousr]_[A-Za-z0-9]{20,})\b/g },
  { category: "Credential assignment", re: /(api[_-]?key|apikey|secret|access[_-]?token|auth[_-]?token|password|passwd|pwd|client[_-]?secret)\s*[:=]\s*["']?[A-Za-z0-9+/=_.-]{8,}/gi },
  { category: "Private key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g },
  { category: "Bearer token", re: /\bBearer\s+[A-Za-z0-9._~+/=-]{20,}/g },
  { category: "Email address", re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { category: "Phone number", re: /(?:\+\d{1,3}[\s.-]?)?\(?\d{3,4}\)?[\s.-]\d{3,4}[\s.-]\d{3,4}/g },
  { category: "Internal IP", re: /\b(?:192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|127\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g },
  { category: "Internal hostname", re: /\b(?:[a-z0-9-]+\.)?(?:localhost|.*\.local|.*\.lan|.*\.internal|.*\.sslip\.io)\b/gi },
  { category: "Filesystem path", re: /[A-Za-z]:\\[^"\s\\]*(?:\\[^"\s\\]*)*|(?:\/home\/|\/Users\/|\/mnt\/|\/etc\/|\/var\/|\/opt\/)[^\s"']*/g },
  { category: "Private workspace path", re: /(?:Desktop[\\/]Agentic|C:\\Users\\[^\\]+|\\Users\\)/gi },
  { category: "Windows username", re: /\b(?:argen|nikko)\b/gi },
];

/** Split matches: emails matching the owner's public address are allowed. */
function isAllowed(match: string): boolean {
  return OWNER_EMAILS.includes(match.toLowerCase());
}

function runPatterns(input: string): SensitiveViolation[] {
  const violations: SensitiveViolation[] = [];
  for (const pattern of PATTERNS) {
    const seen = new Set<string>();
    pattern.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.re.exec(input)) !== null) {
      const match = m[0];
      if (isAllowed(match)) continue;
      seen.add(match);
      // Prevent zero-width infinite loops on global regexes
      if (m.index === pattern.re.lastIndex) pattern.re.lastIndex++;
    }
    if (seen.size > 0) {
      violations.push({ category: pattern.category, matches: [...seen] });
    }
  }
  return violations;
}

export function scanSensitive(input: string): SensitiveScanResult {
  const violations = runPatterns(input);
  const count = violations.reduce((sum, v) => sum + v.matches.length, 0);
  return { clean: count === 0, count, violations };
}

export function redactSensitive(input: string): { text: string; redacted: number } {
  let redacted = 0;
  let text = input;
  for (const pattern of PATTERNS) {
    pattern.re.lastIndex = 0;
    text = text.replace(pattern.re, (match) => {
      if (isAllowed(match)) return match;
      redacted++;
      return "[REDACTED]";
    });
  }
  return { text, redacted };
}