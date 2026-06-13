# Intrinsic Design documentation — start here

Company-wide design foundation for every Intrinsic Value product.

**Live reference:** [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc)  
**Repo:** `intrinsicvalue-llc/design`

---

## Living documents

| Doc | Purpose |
|-----|---------|
| [`README.md`](../README.md) | Quick start, structure, consumption summary |
| [`CHANGELOG.md`](../CHANGELOG.md) | Plain-English release history (also on the reference site) |
| [`docs/CONSUMPTION.md`](CONSUMPTION.md) | GitHub Packages, submodule, SPM, CI in product repos |
| [`docs/PUBLISH_TOKENS_CSS.md`](PUBLISH_TOKENS_CSS.md) | Release `@intrinsicvalue-llc/tokens-css` |
| [`docs/DEPLOY_DOCS_SITE.md`](DEPLOY_DOCS_SITE.md) | Vercel + DNS for reference site |
| [`docs/MILESTONES.md`](MILESTONES.md) | Pointer to cross-repo platform milestones |

---

## Source of truth (code)

| Path | Purpose |
|------|---------|
| `tokens/foundation.json` | Spacing, radius, motion, status colors |
| `tokens/themes/*.json` | Per-product accent + semantic colors |
| `patterns/` | List→Detail, editor sheet, empty state, destructive action |
| `voice/` | Copy standards, entity names, voice intents |
| `principles/` | Foundation + universal UX law |
| `adr/` | Design ADRs |
| `build.mjs` → `dist/`, `swift/`, `npm/tokens-css/` | Generated artifacts (committed) |
| `docs-site/` | Next.js reference site |

---

## For agents

1. Read **`principles/UNIVERSAL.md`** before UI work in any IV product.
2. Change tokens in JSON → `npm run build` → commit generated outputs.
3. Pattern-first: platform-native UI (SwiftUI Liquid Glass, Tailwind) — not cross-platform widgets.
4. Product-specific personality lives in product repos; foundation lives here.

Cursor: `.cursor/rules/intrinsic-design-tokens.mdc`, `.cursor/rules/documentation-hierarchy.mdc`.

---

## Cross-repo index

Platform milestone week (Keystone, app.tasteful.to, this site):  
**`intrinsicvalue-llc/tasteful`** → `docs/PLATFORM_MILESTONES.md`

---

## Versioning

Semver git tags on this repo (e.g. **`v1.0.0`**) publish **`@intrinsicvalue-llc/tokens-css`**. Product repos pin via npm alias `@intrinsic/tokens-css`.
