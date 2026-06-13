# Changelog

Readable history for **Intrinsic Design** — what changed in each release of `@intrinsic/tokens-css` and the reference site.

Versions match git tags on `intrinsicvalue-llc/design` (e.g. `v1.0.5`).

---

## 1.0.5 — 2026-06-13

### Keystone admin console typography

The Keystone admin console (`keystone.intrinsicvalue.llc`) was hard to read: tables, nav tabs, and monospace ID columns used ad-hoc Tailwind sizes (`text-xs`, `text-sm`) that were one step too small.

**What’s new**

- **Semantic type roles** in `tokens/themes/keystone.json`: `body`, `label`, `tab`, `tableCell`, `tableCode` — all at a readable admin scale (15px body/table, 14px labels).
- **`keystone.utilities.css`** — compose with classes instead of picking pixel sizes:
  - `.iv-body` — descriptions, search inputs, footer notes, session email
  - `.iv-label` — section headings and table column headers
  - `.iv-tab` — shell nav and detail tabs
  - `.iv-table` — table wrapper (body never below body size)
  - `.iv-table-code` — USR-* IDs, UUIDs, audit text (monospace at **body size**, not smaller)
- **Foundation** — shared `--intrinsic-font-mono` stack for code columns.
- **Pattern docs** — `patterns/LIST_DETAIL.md` documents admin console typography rules.
- **Reference site** — Users list specimen on [/themes](https://design.intrinsicvalue.llc/themes) as the acceptance preview.

**If you consume tokens in a web app**

1. Bump `@intrinsic/tokens-css` to `^1.0.5`.
2. Add `@import "@intrinsic/tokens-css/keystone.utilities.css";` after the Keystone theme import.
3. Replace `text-xs` / `text-sm` in admin UI with the `.iv-*` classes (Keystone is already migrated).

---

## 1.0.4 — 2026-06

- Reference site version badge reads from `npm/tokens-css/package.json` so the site always shows the published package version.

---

## 1.0.2 — 2026-06

- Fixed GitHub Actions publish workflow for `@intrinsicvalue-llc/tokens-css`.
- Tokens publish using `GITHUB_TOKEN` from the design repo (no separate npm PAT required when org permissions are set correctly).

---

## 1.0.1 — 2026-06

- First publish of `@intrinsicvalue-llc/tokens-css` to GitHub Packages.
- Web apps install via npm alias `@intrinsic/tokens-css`.

---

## 1.0.0 — 2026-06

- Initial Intrinsic Design repo: foundation tokens, product themes (Tasteful, Keystone, intrinsic-www), patterns, voice, ADRs.
- Generated outputs: CSS (`dist/`, npm package), Swift `IntrinsicDesign` SPM.
- Reference site at [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc).
