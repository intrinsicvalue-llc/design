export type ReleaseSection = {
  label: string;
  items: string[];
};

export type Release = {
  version: string;
  date: string;
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
