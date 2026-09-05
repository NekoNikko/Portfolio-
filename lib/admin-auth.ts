// Admin authentication for the /admin area.
//
// Zero-dependency, file-free session model:
//   - The owner sets ADMIN_PASSWORD (server-side env only, never client).
//   - Login verifies the password and issues an HMAC-signed, HttpOnly,
//     SameSite=Lax cookie that expires after SESSION_TTL.
//   - Every admin API route and admin page verifies the signature + expiry.
//   - Login is rate-limited per IP; admin mutations check the Origin header
//     as a CSRF backstop (SameSite=Lax + JSON body already help).

import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = "portfolio_admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function adminConfigured(): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return typeof pw === "string" && pw.trim().length >= 8;
}

function hmacKey(): Buffer {
  // Derive a stable key from the password; the password itself never leaves
  // the server and is never written to the client.
  return crypto
    .createHash("sha256")
    .update(`portfolio-admin:${process.env.ADMIN_PASSWORD ?? "unset"}`)
    .digest();
}

export function verifyPassword(password: string): boolean {
  if (!adminConfigured()) return false;
  const expected = process.env.ADMIN_PASSWORD!;
  const a = crypto.timingSafeEqual(
    crypto.createHash("sha256").update(password).digest(),
    crypto.createHash("sha256").update(expected).digest()
  );
  return a;
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: "admin", exp: Date.now() + SESSION_TTL_MS })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", hmacKey())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = crypto
    .createHmac("sha256", hmacKey())
    .update(payload)
    .digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: createSessionToken(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory; resets on server restart — acceptable for the
// local-first admin panel)
// ---------------------------------------------------------------------------

const loginAttempts = new Map<string, number[]>();

/** Allow up to `max` attempts per IP per window. */
export function checkRateLimit(ip: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const recent = (loginAttempts.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    loginAttempts.set(ip, recent);
    return false;
  }
  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// CSRF backstop: admin mutations must originate from the same site.
// ---------------------------------------------------------------------------

export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, scripts)
  try {
    const originHost = new URL(origin).host;
    const base = process.env.PUBLIC_BASE_URL ?? "http://localhost:3000";
    const baseHost = new URL(base).host;
    return originHost === baseHost || originHost === "localhost:3000";
  } catch {
    return false;
  }
}