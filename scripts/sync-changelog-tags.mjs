#!/usr/bin/env node
/**
 * Sync changelog/releases.json releasedAt from git tags (v{version}).
 * Tags are the canonical publish instant; JSON holds human copy.
 *
 * Usage: node scripts/sync-changelog-tags.mjs [--check]
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RELEASES_PATH = path.join(ROOT, "changelog/releases.json");

function tagReleasedAtUtc(version) {
  try {
    const iso = execSync(`git log -1 --format=%cI "v${version}"`, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!iso) return null;
    return new Date(iso).toISOString().replace(/\.\d{3}Z$/, "Z");
  } catch {
    return null;
  }
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const data = JSON.parse(fs.readFileSync(RELEASES_PATH, "utf8"));
  const mismatches = [];

  for (const release of data.releases) {
    const fromTag = tagReleasedAtUtc(release.version);
    if (!fromTag) continue;

    if (release.releasedAt !== fromTag) {
      mismatches.push({ version: release.version, json: release.releasedAt, tag: fromTag });
      if (!checkOnly) {
        release.releasedAt = fromTag;
      }
    }
  }

  if (checkOnly) {
    if (mismatches.length > 0) {
      console.error("changelog/releases.json releasedAt out of sync with git tags:");
      for (const m of mismatches) {
        console.error(`  v${m.version}: json=${m.json} tag=${m.tag}`);
      }
      console.error("Run: npm run changelog:sync");
      process.exit(1);
    }
    console.log("Changelog timestamps match git tags.");
    return;
  }

  if (mismatches.length === 0) {
    console.log("Changelog timestamps already match git tags.");
    return;
  }

  fs.writeFileSync(RELEASES_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Updated ${mismatches.length} releasedAt value(s) from git tags:`);
  for (const m of mismatches) {
    console.log(`  v${m.version} → ${m.tag}`);
  }
  console.log("Run npm run build to regenerate CHANGELOG.md.");
}

main();
