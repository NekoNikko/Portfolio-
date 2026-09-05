import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  adminConfigured,
  createSessionToken,
  verifySessionToken,
  verifyPassword,
  checkRateLimit,
  isValidOrigin,
} from "@/lib/admin-auth";

function withAdminPassword(value: string) {
  const original = process.env.ADMIN_PASSWORD;
  if (value === null) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = value;
  return () => {
    if (original === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = original;
  };
}

describe("adminConfigured", () => {
  it("requires a password of at least 8 characters", () => {
    const restore = withAdminPassword("short");
    expect(adminConfigured()).toBe(false);
    restore();
    const restore2 = withAdminPassword("a-very-long-secret-password");
    expect(adminConfigured()).toBe(true);
    restore2();
  });
});

describe("verifyPassword", () => {
  it("accepts the configured password and rejects others", () => {
    const restore = withAdminPassword("correct-horse-battery-staple");
    expect(verifyPassword("correct-horse-battery-staple")).toBe(true);
    expect(verifyPassword("wrong-password")).toBe(false);
    restore();
  });
});

describe("session tokens", () => {
  beforeEach(() => {
    withAdminPassword("test-secret-password-12345");
  });
  afterEach(() => {
    withAdminPassword("test-secret-password-12345");
    vi.useRealTimers();
  });

  it("verifies a freshly created token", () => {
    const token = createSessionToken();
    expect(verifySessionToken(token)).toBe(true);
  });

  it("rejects tampered tokens", () => {
    const token = createSessionToken();
    const tampered = `${token.slice(0, -3)}abc`;
    expect(verifySessionToken(tampered)).toBe(false);
  });

  it("rejects malformed tokens", () => {
    expect(verifySessionToken("no-dot-here")).toBe(false);
    expect(verifySessionToken(null)).toBe(false);
    expect(verifySessionToken(undefined)).toBe(false);
    expect(verifySessionToken("")).toBe(false);
  });

  it("rejects expired tokens", () => {
    vi.useFakeTimers();
    const token = createSessionToken();
    vi.advanceTimersByTime(13 * 60 * 60 * 1000); // past the 12h TTL
    expect(verifySessionToken(token)).toBe(false);
  });
});

describe("rate limiting", () => {
  it("blocks after the configured number of attempts", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4", 5, 60_000)).toBe(true);
    }
    expect(checkRateLimit("1.2.3.4", 5, 60_000)).toBe(false);
    // A different IP is unaffected
    expect(checkRateLimit("5.6.7.8", 5, 60_000)).toBe(true);
  });
});

describe("isValidOrigin", () => {
  it("allows the configured base URL and localhost", () => {
    expect(isValidOrigin(new Request("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    }))).toBe(true);
  });

  it("rejects foreign origins", () => {
    expect(isValidOrigin(new Request("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { origin: "https://evil.example.com" },
    }))).toBe(false);
  });

  it("allows non-browser requests without an origin header", () => {
    expect(isValidOrigin(new Request("http://localhost:3000/api/admin/login", {
      method: "POST",
    }))).toBe(true);
  });
});