import type {
  ContentType,
  SanitizationReport,
} from "./content-automation-types";

export interface RedactionResult {
  text: string;
  redacted: number;
}

const SENSITIVE_KEY =
  /^(?:password|passwd|secret|api[_-]?key|apikey|token|authorization)$/i;

const STANDALONE_SENSITIVE_VALUE =
  /(?:password|secret)/i;

export function redactContent(input: string): RedactionResult {
  let text = input;
  let redacted = 0;

  const replace = (
    pattern: RegExp,
    replacement:
      | string
      | ((substring: string, ...args: string[]) => string)
  ) => {
    text = text.replace(pattern, (...args) => {
      redacted += 1;

      if (typeof replacement === "function") {
        return replacement(
          args[0],
          ...args.slice(1, -2)
        );
      }

      return replacement;
    });
  };

  // Authorization bearer credentials.
  replace(
    /Authorization\s*:\s*Bearer\s+[A-Za-z0-9._~-]+/gi,
    "Authorization: Bearer [REDACTED]"
  );

  // OpenAI-style / similar API key tokens.
  replace(
    /\bsk-[A-Za-z0-9._-]+\b/g,
    "[REDACTED]"
  );

  // Explicit password assignments while preserving surrounding syntax.
  replace(
    /(\bpassword\s*[:=]\s*["']?)([^"'\s;]+)(["']?)/gi,
    (_match, prefix, _value, suffix) =>
      `${prefix}[REDACTED]${suffix}`
  );

  // Local Windows filesystem paths.
  replace(
    /\b[A-Za-z]:\\(?:[^\\\s"'`;]+\\)*[^\\\s"'`;]*/g,
    "[REDACTED]"
  );

  return { text, redacted };
}

function sanitizeValue(
  value: unknown,
  key?: string
): unknown {
  if (key && SENSITIVE_KEY.test(key)) {
    return "[REDACTED]";
  }

  if (typeof value === "string") {
    const result = redactContent(value);

    if (result.redacted > 0) {
      return result.text;
    }

    if (STANDALONE_SENSITIVE_VALUE.test(value)) {
      return "[REDACTED]";
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const output: Record<string, unknown> = {};

    for (const [childKey, childValue] of Object.entries(
      value as Record<string, unknown>
    )) {
      output[childKey] = sanitizeValue(
        childValue,
        childKey
      );
    }

    return output;
  }

  return value;
}

export function sanitizeObject(
  input: Record<string, unknown>,
  allowedFields?: string[]
): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  const allowed = allowedFields
    ? new Set(allowedFields)
    : null;

  for (const [key, value] of Object.entries(input)) {
    if (allowed && !allowed.has(key)) {
      continue;
    }

    output[key] = sanitizeValue(value, key);
  }

  return output;
}

export function createSanitizationReport(
  input: string
): SanitizationReport {
  const violations: string[] = [];

  if (/Authorization\s*:\s*Bearer\s+/i.test(input)) {
    violations.push("authorization");
  }

  if (/\bsk-[A-Za-z0-9._-]+\b/.test(input)) {
    violations.push("api-key");
  }

  if (/\bpassword\s*[:=]/i.test(input)) {
    violations.push("password");
  }

  if (/\b[A-Za-z]:\\/.test(input)) {
    violations.push("local-path");
  }

  const { redacted } = redactContent(input);

  return {
    clean: redacted === 0,
    count: violations.length,
    violations,
    redactedCount: redacted,
  };
}

export function sanitizeDraft<
  T extends Record<string, unknown>
>(
  draft: T,
  contentType: ContentType
): T {
  // Content type is intentionally accepted as part of the public
  // contract. Sanitization remains conservative for every type.
  void contentType;

  return sanitizeObject(draft) as T;
}