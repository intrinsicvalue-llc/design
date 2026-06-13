#!/usr/bin/env node
/**
 * Intrinsic Design token builder — zero dependencies.
 * Repo: intrinsicvalue-llc/design
 * Source: tokens/
 * Outputs: dist/css/, swift/Sources/IntrinsicDesign/, npm/tokens-css/dist/css/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const TOKENS_DIR = path.join(ROOT, "tokens");
const DIST_CSS = path.join(ROOT, "dist/css");
const NPM_CSS = path.join(ROOT, "npm/tokens-css/dist/css");
const SWIFT_OUT = path.join(ROOT, "swift/Sources/IntrinsicDesign/IntrinsicFoundation.generated.swift");

const GENERATED_BANNER =
  "/* GENERATED — intrinsicvalue-llc/design build.mjs — do not edit. Run: npm run build */\n";

const SWIFT_BANNER = `//
// IntrinsicFoundation.generated.swift
// GENERATED — intrinsicvalue-llc/design — do not edit.
// Source: tokens/foundation.json
// Regenerate: npm run build (design repo root)
//

`;

function readJSON(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeIfChanged(filePath, content) {
  ensureDir(path.dirname(filePath));
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (existing === content) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function cssVar(prefix, name) {
  return `--color-${prefix}-${name}`;
}

function buildThemeCSS(theme) {
  const p = theme.cssPrefix;
  const c = theme.color;
  const lines = [];

  lines.push(GENERATED_BANNER);
  lines.push("@theme {");
  lines.push(`  --font-sans: var(--intrinsic-font-sans);`);
  if (theme.meta.id === "tasteful-www" || theme.meta.id === "intrinsic-www") {
    lines.push(`  --font-display: var(--intrinsic-font-display);`);
  }
  lines.push(`  ${cssVar(p, "fg")}: ${c.fg.light};`);
  lines.push(`  ${cssVar(p, "muted")}: ${c.muted.light};`);
  lines.push(`  ${cssVar(p, "line")}: ${c.line.light};`);
  lines.push(`  ${cssVar(p, "surface")}: ${c.surface.light};`);
  lines.push(`  ${cssVar(p, "accent")}: ${c.accent.light};`);
  if (c.error) {
    lines.push(`  ${cssVar(p, "error")}: ${c.error.light};`);
  }
  lines.push("}\n");

  lines.push("/* Dark mode — :root overrides (not nested @theme) for Tailwind v4 correctness */");
  lines.push("@media (prefers-color-scheme: dark) {");
  lines.push("  :root {");
  lines.push(`    ${cssVar(p, "fg")}: ${c.fg.dark};`);
  lines.push(`    ${cssVar(p, "muted")}: ${c.muted.dark};`);
  lines.push(`    ${cssVar(p, "line")}: ${c.line.dark};`);
  lines.push(`    ${cssVar(p, "surface")}: ${c.surface.dark};`);
  lines.push(`    ${cssVar(p, "accent")}: ${c.accent.dark};`);
  if (c.error) {
    lines.push(`    ${cssVar(p, "error")}: ${c.error.dark};`);
  }
  lines.push("  }");
  lines.push("}\n");

  if (theme.variants?.forceLightPalette) {
    const v = theme.variants.forceLightPalette;
    lines.push("/* Marketing lab routes — readable warm palette even when OS is dark */");
    lines.push(".force-light-palette {");
    lines.push(`  ${cssVar(p, "fg")}: ${v.fg};`);
    lines.push(`  ${cssVar(p, "muted")}: ${v.muted};`);
    lines.push(`  ${cssVar(p, "line")}: ${v.line};`);
    lines.push(`  ${cssVar(p, "surface")}: ${v.surface};`);
    lines.push(`  ${cssVar(p, "accent")}: ${v.accent};`);
    lines.push("}\n");
  }

  return lines.join("\n");
}

function buildFoundationCSS(foundation) {
  const lines = [];
  lines.push(GENERATED_BANNER);
  lines.push(":root {");
  lines.push(`  --intrinsic-font-sans: ${foundation.typography.fontStackSans};`);
  lines.push(`  --intrinsic-font-display: ${foundation.typography.fontStackDisplay};`);
  for (const [key, px] of Object.entries(foundation.space)) {
    lines.push(`  --intrinsic-space-${key}: ${px}px;`);
  }
  for (const [key, px] of Object.entries(foundation.radius)) {
    lines.push(`  --intrinsic-radius-${key}: ${px}px;`);
  }
  lines.push(`  --intrinsic-control-glass-icon-square: ${foundation.control.glassIconSquare}px;`);
  for (const [key, ms] of Object.entries(foundation.motion)) {
    const slug = key.replace(/Ms$/, "").replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
    lines.push(`  --intrinsic-motion-${slug}: ${ms}ms;`);
  }
  lines.push("}\n");
  return lines.join("\n");
}

const SWIFT_COLOR_MAP = {
  blue: ".blue",
  orange: ".orange",
  green: ".green",
  red: ".red",
  secondary: ".secondary",
};

function buildSwift(foundation) {
  const lines = [SWIFT_BANNER, "import SwiftUI\n"];

  lines.push("/// Company-wide spacing scale (4pt grid). Source: tokens/foundation.json");
  lines.push("public enum IntrinsicSpacing {");
  for (const [key, value] of Object.entries(foundation.space)) {
    lines.push(`    public static let ${key}: CGFloat = ${value}`);
  }
  lines.push("}\n");

  lines.push("/// Corner radii for repeated product surfaces.");
  lines.push("public enum IntrinsicRadius {");
  for (const [key, value] of Object.entries(foundation.radius)) {
    lines.push(`    public static let ${key}: CGFloat = ${value}`);
  }
  lines.push("}\n");

  lines.push("/// Semantic status colors — prefer system roles on Apple platforms.");
  lines.push("public enum IntrinsicColorRole {");
  for (const [key, role] of Object.entries(foundation.colorRole)) {
    const swiftColor = SWIFT_COLOR_MAP[role.swift] ?? `.${role.swift}`;
    lines.push(`    public static let ${key}: Color = ${swiftColor}`);
  }
  lines.push("}\n");

  lines.push("/// Semantic ControlSize aliases (SwiftUI-native; not pixel tokens).");
  lines.push("public enum IntrinsicControlSize {");
  lines.push("    /// Default in-content control (maps to `.regular`).");
  lines.push("    public static let standard: ControlSize = .regular");
  lines.push("    /// Taller paired actions in dense cards (maps to `.large`).");
  lines.push("    public static let heroActionPair: ControlSize = .large");
  lines.push(`    /// HIG minimum touch; square so \`.glass\` renders as a circle.`);
  lines.push(`    public static let glassIconSquare: CGFloat = ${foundation.control.glassIconSquare}`);
  lines.push("}\n");

  lines.push("// MARK: - Product back-compat typealiases");
  lines.push("public typealias TastefulSpacing = IntrinsicSpacing");
  lines.push("public typealias TastefulRadius = IntrinsicRadius");
  lines.push("public typealias TastefulColorRole = IntrinsicColorRole");
  lines.push("public typealias TastefulControlSize = IntrinsicControlSize");
  lines.push("");

  return lines.join("\n");
}

function buildThemeManifest(themes) {
  return (
    JSON.stringify(
      {
        version: readJSON("package.json").version,
        themes: themes.map((t) => ({
          id: t.meta.id,
          label: t.meta.label,
          surface: t.meta.surface,
          cssPrefix: t.cssPrefix,
          cssOutput: `dist/css/${t.meta.id}.theme.css`,
          npmExport: `@intrinsic/tokens-css/${t.meta.id}.theme.css`,
        })),
      },
      null,
      2
    ) + "\n"
  );
}

function mirrorCssToNpm(fileName, content) {
  return [
    { path: path.join(DIST_CSS, fileName), content },
    { path: path.join(NPM_CSS, fileName), content },
  ];
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const foundation = readJSON("tokens/foundation.json");

  const themeFiles = fs
    .readdirSync(path.join(TOKENS_DIR, "themes"))
    .filter((f) => f.endsWith(".json"))
    .sort();

  const themes = themeFiles.map((f) => readJSON(`tokens/themes/${f}`));

  const outputs = [];
  const foundationCss = buildFoundationCSS(foundation);
  outputs.push(...mirrorCssToNpm("foundation.css", foundationCss));

  for (const theme of themes) {
    const css = buildThemeCSS(theme);
    outputs.push(...mirrorCssToNpm(`${theme.meta.id}.theme.css`, css));
  }

  const swift = buildSwift(foundation);
  outputs.push({ path: SWIFT_OUT, content: swift });
  outputs.push({ path: path.join(ROOT, "dist/swift/IntrinsicFoundation.generated.swift"), content: swift });

  outputs.push({
    path: path.join(ROOT, "dist/themes.json"),
    content: buildThemeManifest(themes),
  });

  let changed = 0;
  for (const { path: filePath, content } of outputs) {
    if (writeIfChanged(filePath, content)) changed++;
  }

  if (checkOnly) {
    if (changed > 0) {
      console.error(
        `Design token outputs are stale (${changed} file(s) would change). Run: npm run build`
      );
      process.exit(1);
    }
    console.log("Design token outputs are up to date.");
    return;
  }

  console.log(`Built ${outputs.length} artifact(s)${changed ? ` (${changed} updated)` : " (unchanged)"}.`);
}

main();
