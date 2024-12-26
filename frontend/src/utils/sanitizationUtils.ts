export const sanitizeInput = (value: unknown): string => {
  if (typeof value !== "string") return "";

  const sanitized = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();

  return sanitized;
};
