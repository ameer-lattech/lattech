

export const stripTags = (s: string) => s.replace(/<[^>]*>/g, "");

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const removeControlChars = (s: string) =>
  s
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

export const normalizeWhitespace = (s: string) => s.replace(/\s+/g, " ").trim();

export const clampLen = (s: string, maxLen: number) => (maxLen > 0 ? s.slice(0, maxLen) : "");

// ---------- Primitive cleaners ----------
export function cleanText(input: unknown, maxLen: number, opts?: { escape?: boolean }) {
  let s = String(input ?? "");
  s = removeControlChars(s);
  s = s.trim();
  s = stripTags(s);
  s = normalizeWhitespace(s);
  s = clampLen(s, maxLen);
  if (opts?.escape) s = escapeHtml(s);
  return s;
}

export function cleanEmail(input: unknown, maxLen = 120) {
  return cleanText(input, maxLen).toLowerCase();
}

export function cleanDigits(input: unknown, maxLen: number) {
  let s = String(input ?? "");
  s = removeControlChars(s);
  s = s.replace(/\D/g, "");
  return clampLen(s, maxLen);
}

// ---------- Reusable sanitise/validate for any form ----------
export type FieldRule =
  | { type: "text"; max: number; required?: boolean; minLen?: number }
  | { type: "email"; max?: number; required?: boolean }
  | { type: "digits"; max: number; required?: boolean; minLen?: number }
  | { type: "boolean"; requiredTrue?: boolean };

export type RulesMap<T extends Record<string, any>> = {
  [K in keyof T]: FieldRule;
};

export function sanitizeObject<T extends Record<string, any>>(input: any, rules: RulesMap<T>): T {
  const out: any = {};

  for (const key in rules) {
    const rule = rules[key];
    const raw = input?.[key];

    if (rule.type === "text") {
      out[key] = cleanText(raw, rule.max);
    } else if (rule.type === "email") {
      out[key] = cleanEmail(raw, rule.max ?? 120);
    } else if (rule.type === "digits") {
      out[key] = cleanDigits(raw, rule.max);
    } else if (rule.type === "boolean") {
      // keep boolean clean
      out[key] = raw === true;
    }
  }

  return out as T;
}

export function validateByRules<T extends Record<string, any>>(data: T, rules: RulesMap<T>) {
  const errors: Record<string, string> = {};

  for (const key in rules) {
    const rule = rules[key];
    const val: any = (data as any)[key];

    // required checks
    if (rule.type === "boolean" && rule.requiredTrue) {
      if (val !== true) errors[key] = "Required";
      continue;
    }

    const isReq =
      (rule.type === "text" || rule.type === "email" || rule.type === "digits") && rule.required;

    if (isReq) {
      if (!String(val ?? "").trim()) {
        errors[key] = "Required";
        continue;
      }
    }

    // extra checks
    if (rule.type === "text" && String(val ?? "").trim()) {
      if (rule.minLen && String(val).trim().length < rule.minLen) {
        errors[key] = "Too short";
      }
    }

    if (rule.type === "email" && String(val ?? "").trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(val).trim());
      if (!ok) errors[key] = "Invalid email";
    }

    if (rule.type === "digits" && String(val ?? "").trim()) {
      if (rule.minLen && String(val).length < rule.minLen) {
        errors[key] = "Too short";
      }
    }
  }

  return errors;
}
