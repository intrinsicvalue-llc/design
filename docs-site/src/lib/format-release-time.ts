export type ReleasePrecision = "month" | "day" | "instant";

export type ParsedReleaseTime = {
  /** Canonical value for `<time dateTime>` — UTC instant or YYYY-MM-DD / YYYY-MM-01. */
  dateTime: string;
  /** UTC ISO string for instant precision; empty for month/day backfill. */
  utc: string;
  precision: ReleasePrecision;
};

/** Parse `releasedAt` from changelog/releases.json. Instants should be UTC with a trailing Z. */
export function parseReleasedAt(value: string): ParsedReleaseTime {
  if (/^\d{4}-\d{2}$/.test(value)) {
    return { dateTime: `${value}-01`, utc: "", precision: "month" };
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { dateTime: value, utc: "", precision: "day" };
  }

  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return { dateTime: value, utc: value, precision: "day" };
  }

  const utc = new Date(parsed).toISOString();
  return { dateTime: utc, utc, precision: "instant" };
}

/** Localized display for the viewer's browser timezone. */
export function formatLocalizedInstant(isoUtc: string, locale?: string): string {
  const date = new Date(isoUtc);
  // dateStyle + timeStyle cannot be combined with timeZoneName (throws in V8/WebKit).
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function formatBackfillLabel(value: string, precision: ReleasePrecision): string {
  if (precision === "month") return `${value} · month (approx.)`;
  if (precision === "day") return value;
  return value;
}
