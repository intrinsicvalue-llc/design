# Design repo architecture (ADR)

**Status:** Approved — June 2026  
**Decision:** Intrinsic Design lives in **`intrinsicvalue-llc/design`**, not inside any product repo.

## Context

Intrinsic Value ships multiple products (Tasteful, Keystone, website, Venn Gogh, …) from separate GitHub repos. A design system embedded in `tasteful` forces wrong dependency direction (Keystone importing from Tasteful) and does not scale to N apps.

## Decision

| Layer | Repo | Role |
|-------|------|------|
| Design foundation | **`design`** | tokens, patterns, voice, ADRs, generators, reference site |
| Product | `tasteful`, `keystone`, `intrinsic-www`, … | app code + product-specific docs |

### Consumption by product type

| Product type | Web CSS | iOS Swift | Submodule |
|--------------|---------|-----------|-----------|
| Web-only (Keystone, intrinsic-www) | GitHub Packages `@intrinsic/tokens-css` | — | **No** |
| iOS + web (tasteful) | GitHub Packages | SPM `design/swift` | **Yes** (iOS path) |
| Patterns / voice (all) | — | — | [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc) |

## Consequences

- Token changes release from `design` on semver tags → publish workflow → GitHub Packages
- Web product repos pin npm version; bump on design releases
- Web CI/deploy: **`NODE_AUTH_TOKEN`** with `read:packages` — no submodule clone
- tasteful iOS CI: submodule checkout for `design/swift`
- Agents read patterns/voice on the live design site or this repo — not vendored copies in web-only repos

## Supersedes

- `packages/design/` inside tasteful monorepo (removed)
- Hand-maintained CSS variables in keystone/website (migrated to themes)
- Git submodule in **every** product repo (see ADR-009)
