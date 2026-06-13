export type ThemeColors = {
  fg: { light: string; dark: string };
  muted: { light: string; dark: string };
  line: { light: string; dark: string };
  surface: { light: string; dark: string };
  accent: { light: string; dark: string };
  error?: { light: string; dark: string };
};

export type Theme = {
  meta: { id: string; label: string; surface: string };
  cssPrefix: string;
  color: ThemeColors;
  density?: { rowPaddingY: number; rowPaddingX: number };
  variants?: Record<string, unknown>;
};

export type Foundation = {
  meta: { name: string; version: string };
  space: Record<string, number>;
  radius: Record<string, number>;
  control: { glassIconSquare: number };
  motion: Record<string, number>;
  typography: { fontStackSans: string; fontStackDisplay: string };
  colorRole: Record<string, { swift: string; web: string }>;
};

export const DESIGN_VERSION = "1.0.0";

export function themeVar(prefix: string, name: string): string {
  return `--color-${prefix}-${name}`;
}

export function cssVarsForTheme(theme: Theme, mode: "light" | "dark"): Record<string, string> {
  const p = theme.cssPrefix;
  const c = theme.color;
  const pick = <T extends { light: string; dark: string }>(v: T) => v[mode];
  const vars: Record<string, string> = {
    [themeVar(p, "fg")]: pick(c.fg),
    [themeVar(p, "muted")]: pick(c.muted),
    [themeVar(p, "line")]: pick(c.line),
    [themeVar(p, "surface")]: pick(c.surface),
    [themeVar(p, "accent")]: pick(c.accent),
  };
  if (c.error) vars[themeVar(p, "error")] = pick(c.error);
  return vars;
}

export const NAV = [
  { href: "/", label: "Overview" },
  { href: "/foundation", label: "Foundation" },
  { href: "/themes", label: "Themes" },
  { href: "/patterns", label: "Patterns" },
  { href: "/voice", label: "Voice" },
  { href: "/decisions", label: "Decisions" },
] as const;

export const PATTERNS = [
  { slug: "list-detail", file: "LIST_DETAIL.md", title: "List → Detail" },
  { slug: "editor-sheet", file: "EDITOR_SHEET.md", title: "Editor sheet" },
  { slug: "empty-state", file: "EMPTY_STATE.md", title: "Empty state" },
  { slug: "destructive-action", file: "DESTRUCTIVE_ACTION.md", title: "Destructive action" },
] as const;

export const VOICE_DOCS = [
  { slug: "copy-standards", file: "COPY_STANDARDS.md", title: "Copy standards" },
  { slug: "entity-names", file: "ENTITY_NAMES.md", title: "Entity names" },
  { slug: "voice-intents", file: "VOICE_INTENTS.md", title: "Voice & intents" },
] as const;
