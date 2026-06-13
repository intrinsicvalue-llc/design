import fs from "fs";
import path from "path";
import type { Foundation, Theme } from "./design-types";
import { NAV, PATTERNS, VOICE_DOCS, cssVarsForTheme, themeVar } from "./design-types";

export { NAV, PATTERNS, VOICE_DOCS, cssVarsForTheme, themeVar };
export type { Foundation, Theme, ThemeColors } from "./design-types";

const REPO_ROOT = path.join(process.cwd(), "..");

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(REPO_ROOT, relativePath), "utf8")) as T;
}

/** Published @intrinsicvalue-llc/tokens-css version (matches git release tag). */
export function getDesignVersion(): string {
  return readJson<{ version: string }>("npm/tokens-css/package.json").version;
}

export function getFoundation(): Foundation {
  return readJson<Foundation>("tokens/foundation.json");
}

export function getThemes(): Theme[] {
  const dir = path.join(REPO_ROOT, "tokens/themes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => readJson<Theme>(`tokens/themes/${f}`));
}

export function getTheme(id: string): Theme | undefined {
  return getThemes().find((t) => t.meta.id === id);
}

export function readMarkdown(relativePath: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, relativePath), "utf8");
}

export function readPattern(slug: string): { title: string; body: string } | null {
  const item = PATTERNS.find((p) => p.slug === slug);
  if (!item) return null;
  return { title: item.title, body: readMarkdown(`patterns/${item.file}`) };
}

export function readVoiceDoc(slug: string): { title: string; body: string } | null {
  const item = VOICE_DOCS.find((v) => v.slug === slug);
  if (!item) return null;
  return { title: item.title, body: readMarkdown(`voice/${item.file}`) };
}
