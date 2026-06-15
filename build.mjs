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

function camelToKebab(s) {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function typeVar(prefix, role, prop) {
  return `--${prefix}-type-${role}-${prop}`;
}

const FOUNDATION_TYPE_PREFIX = "intrinsic";

function foundationTypographyRoles(foundation) {
  return foundation.typography?.roles ?? {};
}

function buildTypographyRoleEntries(prefix, roles) {
  const entries = [];
  for (const [role, spec] of Object.entries(roles)) {
    if (role.startsWith("$")) continue;
    const web = spec.web;
    if (!web) continue;
    const slug = camelToKebab(role);
    entries.push(`  ${typeVar(prefix, slug, "size")}: ${web.sizePx}px;`);
    entries.push(`  ${typeVar(prefix, slug, "line-height")}: ${web.lineHeight};`);
    entries.push(`  ${typeVar(prefix, slug, "weight")}: ${web.weight};`);
    if (web.letterSpacingEm != null) {
      entries.push(`  ${typeVar(prefix, slug, "letter-spacing")}: ${web.letterSpacingEm}em;`);
    }
    entries.push(`  --text-${prefix}-${slug}: ${web.sizePx}px;`);
    entries.push(`  --text-${prefix}-${slug}--line-height: ${web.lineHeight};`);
    entries.push(`  --font-weight-${prefix}-${slug}: ${web.weight};`);
  }
  return entries;
}

function buildFoundationUtilitiesCSS(foundation) {
  const roles = foundationTypographyRoles(foundation);
  if (Object.keys(roles).length === 0) return null;

  const p = FOUNDATION_TYPE_PREFIX;
  const lines = [GENERATED_BANNER];

  lines.push("/* Consumer semantic typography — compose with .iv-* instead of text-xs/text-sm */");
  lines.push("@theme {");
  for (const entry of buildTypographyRoleEntries(p, roles)) {
    lines.push(entry);
  }
  lines.push("}\n");

  for (const [role, spec] of Object.entries(roles)) {
    if (role.startsWith("$") || !spec.web) continue;
    const slug = camelToKebab(role);
    const className = `iv-${slug}`;
    lines.push(`.${className} {`);
    lines.push(`  font-size: var(${typeVar(p, slug, "size")});`);
    lines.push(`  line-height: var(${typeVar(p, slug, "line-height")});`);
    lines.push(`  font-weight: var(${typeVar(p, slug, "weight")});`);
    if (spec.web.letterSpacingEm != null) {
      lines.push(`  letter-spacing: var(${typeVar(p, slug, "letter-spacing")}, normal);`);
    }
    lines.push("}\n");
  }

  return lines.join("\n");
}

function buildTypographyThemeEntries(theme) {
  if (!theme.typography) return [];
  const p = theme.cssPrefix;
  const entries = [];
  for (const [role, spec] of Object.entries(theme.typography)) {
    if (role.startsWith("$")) continue;
    const slug = camelToKebab(role);
    entries.push(`  ${typeVar(p, slug, "size")}: ${spec.sizePx}px;`);
    entries.push(`  ${typeVar(p, slug, "line-height")}: ${spec.lineHeight};`);
    entries.push(`  ${typeVar(p, slug, "weight")}: ${spec.weight};`);
    if (spec.letterSpacingEm != null) {
      entries.push(`  ${typeVar(p, slug, "letter-spacing")}: ${spec.letterSpacingEm}em;`);
    }
    entries.push(`  --text-${p}-${slug}: ${spec.sizePx}px;`);
    entries.push(`  --text-${p}-${slug}--line-height: ${spec.lineHeight};`);
    entries.push(`  --font-weight-${p}-${slug}: ${spec.weight};`);
  }
  return entries;
}

function buildThemeUtilitiesCSS(theme) {
  if (!theme.typography) return null;
  const p = theme.cssPrefix;
  const density = theme.density ?? { rowPaddingY: 10, rowPaddingX: 12 };
  const lines = [GENERATED_BANNER];

  lines.push("/* Semantic admin console typography — compose with .iv-* instead of text-xs/text-sm */");
  lines.push(".iv-body {");
  lines.push(`  font-size: var(${typeVar(p, "body", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "body", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "body", "weight")});`);
  lines.push("}\n");

  lines.push(".iv-label {");
  lines.push(`  font-size: var(${typeVar(p, "label", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "label", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "label", "weight")});`);
  lines.push(`  letter-spacing: var(${typeVar(p, "label", "letter-spacing")}, normal);`);
  lines.push("}\n");

  lines.push(".iv-tab {");
  lines.push(`  font-size: var(${typeVar(p, "tab", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "tab", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "tab", "weight")});`);
  lines.push("}\n");

  lines.push(".iv-page-title {");
  lines.push(`  font-size: var(${typeVar(p, "page-title", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "page-title", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "page-title", "weight")});`);
  lines.push(`  letter-spacing: var(${typeVar(p, "page-title", "letter-spacing")}, -0.02em);`);
  lines.push("}\n");

  lines.push(".iv-table-code {");
  lines.push("  font-family: var(--intrinsic-font-mono);");
  lines.push(`  font-size: var(${typeVar(p, "table-code", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "table-code", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "table-code", "weight")});`);
  lines.push("}\n");

  lines.push(".iv-table {");
  lines.push("  width: 100%;");
  lines.push(`  font-size: var(${typeVar(p, "table-cell", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "table-cell", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "table-cell", "weight")});`);
  lines.push("}\n");

  lines.push(".iv-table thead th {");
  lines.push(`  font-size: var(${typeVar(p, "label", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "label", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "label", "weight")});`);
  lines.push(`  letter-spacing: var(${typeVar(p, "label", "letter-spacing")}, normal);`);
  lines.push(`  color: var(${cssVar(p, "muted")});`);
  lines.push(`  padding: ${density.rowPaddingY}px ${density.rowPaddingX + 4}px;`);
  lines.push("  text-align: left;");
  lines.push("}\n");

  lines.push(".iv-table tbody td {");
  lines.push(`  padding: ${density.rowPaddingY}px ${density.rowPaddingX + 4}px;`);
  lines.push("}\n");

  lines.push(".iv-table tbody td .iv-table-code,");
  lines.push(".iv-table tbody td.iv-table-code {");
  lines.push("  font-family: var(--intrinsic-font-mono);");
  lines.push(`  font-size: var(${typeVar(p, "table-code", "size")});`);
  lines.push(`  line-height: var(${typeVar(p, "table-code", "line-height")});`);
  lines.push(`  font-weight: var(${typeVar(p, "table-code", "weight")});`);
  lines.push("}\n");

  return lines.join("\n");
}

function buildThemeCSS(theme) {
  const p = theme.cssPrefix;
  const c = theme.color;
  const lines = [];

  lines.push(GENERATED_BANNER);
  lines.push("@theme {");
  lines.push(`  --font-sans: var(--intrinsic-font-sans);`);
  if (theme.typography) {
    lines.push(`  --font-mono: var(--intrinsic-font-mono);`);
  }
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
  for (const entry of buildTypographyThemeEntries(theme)) {
    lines.push(entry);
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
  const roles = foundationTypographyRoles(foundation);
  lines.push(GENERATED_BANNER);
  lines.push(":root {");
  lines.push(`  --intrinsic-font-sans: ${foundation.typography.fontStackSans};`);
  lines.push(`  --intrinsic-font-display: ${foundation.typography.fontStackDisplay};`);
  lines.push(`  --intrinsic-font-mono: ${foundation.typography.fontStackMono};`);
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
  for (const entry of buildTypographyRoleEntries(FOUNDATION_TYPE_PREFIX, roles)) {
    lines.push(entry);
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

const SWIFT_FONT_WEIGHT_MAP = {
  regular: ".regular",
  medium: ".medium",
  semibold: ".semibold",
  bold: ".bold",
};

function swiftFontExpression(iosSpec) {
  if (typeof iosSpec === "string") {
    return `.${iosSpec}`;
  }
  const style = iosSpec.textStyle;
  const weight = iosSpec.weight;
  if (weight) {
    const weightExpr = SWIFT_FONT_WEIGHT_MAP[weight] ?? `.${weight}`;
    return `.${style}.weight(${weightExpr})`;
  }
  return `.${style}`;
}

function buildSwiftTypography(foundation) {
  const roles = foundationTypographyRoles(foundation);
  if (Object.keys(roles).length === 0) return "";

  const lines = [];
  lines.push("/// Semantic typography roles — maps to Apple Text Styles (Dynamic Type on iOS).");
  lines.push("/// Web/Android: same role names; web uses foundation CSS vars. See patterns/TYPOGRAPHY.md.");
  lines.push("public enum IntrinsicTypography {");
  for (const [role, spec] of Object.entries(roles)) {
    if (role.startsWith("$") || !spec.ios) continue;
    const expr = swiftFontExpression(spec.ios);
    const useComment = spec.use ? ` /// ${spec.use}` : "";
    lines.push(`    public static let ${role}: Font = ${expr}${useComment}`);
  }
  lines.push("}\n");
  lines.push("public typealias TastefulTypography = IntrinsicTypography");
  lines.push("");
  return lines.join("\n");
}

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

  lines.push(buildSwiftTypography(foundation));

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

function buildChangelogMarkdown() {
  const data = readJSON("changelog/releases.json");
  const lines = [
    "# Changelog",
    "",
    "Release history for **Intrinsic Design** and `@intrinsic/tokens-css`.",
    "",
    "Canonical source: `changelog/releases.json`. Store `releasedAt` in UTC with a trailing `Z` (`npm run changelog:now`).",
    "Versions match git tags on `intrinsicvalue-llc/design`.",
    "",
  ];

  for (const release of data.releases) {
    lines.push(`## v${release.version}`);
    lines.push("");
    lines.push(`**Released:** ${release.releasedAt}`);
    lines.push("");
    lines.push(`### ${release.title}`);
    lines.push("");
    lines.push(release.summary);
    lines.push("");
    for (const section of release.sections) {
      lines.push(`**${section.label}**`);
      for (const item of section.items) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n").replace(/\n---\n\n$/, "\n");
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

  const foundationUtilities = buildFoundationUtilitiesCSS(foundation);
  if (foundationUtilities) {
    outputs.push(...mirrorCssToNpm("foundation.utilities.css", foundationUtilities));
  }

  for (const theme of themes) {
    const css = buildThemeCSS(theme);
    outputs.push(...mirrorCssToNpm(`${theme.meta.id}.theme.css`, css));
    const utilities = buildThemeUtilitiesCSS(theme);
    if (utilities) {
      outputs.push(...mirrorCssToNpm(`${theme.meta.id}.utilities.css`, utilities));
    }
  }

  const swift = buildSwift(foundation);
  outputs.push({ path: SWIFT_OUT, content: swift });
  outputs.push({ path: path.join(ROOT, "dist/swift/IntrinsicFoundation.generated.swift"), content: swift });

  outputs.push({
    path: path.join(ROOT, "dist/themes.json"),
    content: buildThemeManifest(themes),
  });

  outputs.push({ path: path.join(ROOT, "CHANGELOG.md"), content: buildChangelogMarkdown() });

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
