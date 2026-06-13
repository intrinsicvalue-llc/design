export type ReleaseSection = {
  label: string;
  items: string[];
};

export type Release = {
  version: string;
  /** UTC instant — e.g. 2026-06-13T23:11:08Z. Month-only (2026-06) for legacy backfill. */
  releasedAt: string;
  title: string;
  summary: string;
  featured?: boolean;
  sections: ReleaseSection[];
};

export type ChangelogData = {
  releases: Release[];
};

export type AdrRecord = {
  id: string;
  title: string;
  date: string;
  decision: string;
  context: string;
  consequence: string;
};
