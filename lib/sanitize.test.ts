import { describe, expect, it } from "vitest";
import { scanSensitive, redactSensitive } from "@/lib/sanitize";

describe("scanSensitive", () => {
  it("flags API keys", () => {
    const r = scanSensitive("use key sk-abcdefghijklmnopqrstuvwx");
    expect(r.clean).toBe(false);
    expect(r.violations.some((v) => v.category === "API key")).toBe(true);
  });

  it("flags private keys", () => {
    const r = scanSensitive(
      "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA\n-----END RSA PRIVATE KEY-----"
    );
    expect(r.violations.some((v) => v.category === "Private key")).toBe(true);
  });

  it("flags bearer tokens", () => {
    const r = scanSensitive("Authorization: Bearer abcdefghijklmnopqrstuvwxyz123456");
    expect(r.violations.some((v) => v.category === "Bearer token")).toBe(true);
  });

  it("flags credential assignments", () => {
    const r = scanSensitive("const password = 'hunter2secret'");
    expect(r.violations.some((v) => v.category === "Credential assignment")).toBe(true);
  });

  it("flags phone numbers", () => {
    const r = scanSensitive("call me at +63 966-2247-402 anytime");
    expect(r.violations.some((v) => v.category === "Phone number")).toBe(true);
  });

  it("flags internal IPs", () => {
    const r = scanSensitive("server at 192.168.1.17:5678 and 10.0.0.5");
    expect(r.violations.some((v) => v.category === "Internal IP")).toBe(true);
  });

  it("flags filesystem paths", () => {
    const r = scanSensitive("config lives at C:\\Users\\argen\\Desktop\\Agentic");
    expect(r.violations.some((v) => v.category === "Filesystem path")).toBe(true);
  });

  it("allows the owner's public contact email", () => {
    const r = scanSensitive("contact: argente.marlon@gmail.com");
    expect(r.violations.some((v) => v.category === "Email address")).toBe(false);
    expect(r.clean).toBe(true);
  });

  it("flags other email addresses", () => {
    const r = scanSensitive("email client@somewhere.com");
    expect(r.violations.some((v) => v.category === "Email address")).toBe(true);
  });

  it("passes clean professional content", () => {
    const r = scanSensitive(
      "Improved authentication middleware and session validation. Status: completed."
    );
    expect(r.clean).toBe(true);
    expect(r.count).toBe(0);
  });
});

describe("redactSensitive", () => {
  it("replaces matches with [REDACTED]", () => {
    const { text, redacted } = redactSensitive(
      "token sk-abcdefghijklmnopqrstuvwx and ip 192.168.1.17"
    );
    expect(text).toContain("[REDACTED]");
    expect(text).not.toMatch(/sk-[A-Za-z0-9]{16,}/);
    expect(text).not.toMatch(/192\.168\.1\.17/);
    expect(redacted).toBeGreaterThanOrEqual(2);
  });

  it("does not redact the owner's email", () => {
    const { text, redacted } = redactSensitive("email argente.marlon@gmail.com");
    expect(text).toContain("argente.marlon@gmail.com");
    expect(redacted).toBe(0);
  });
});