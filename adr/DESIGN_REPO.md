# Design repo architecture (ADR)

**Status:** Approved — June 2026  
**Decision:** Intrinsic Design lives in **`intrinsicvalue-llc/design`**, not inside any product repo.

## Context

Intrinsic Value ships multiple products (Tasteful, Keystone, website, Venn Gogh, …) from separate GitHub repos. A design system embedded in `tasteful` forces wrong dependency direction (Keystone importing from Tasteful) and does not scale to N apps.

## Decision

| Layer | Repo | Role |
|-------|------|------|
| Design foundation | **`design`** | tokens, patterns, voice, ADRs, generators |
| Product | `tasteful`, `keystone`, … | app code + product-specific docs |

Consumption:

- **Web:** `@intrinsicvalue-llc/tokens-css` on GitHub Packages (install alias `@intrinsic/tokens-css` in product repos)
- **Apple:** Swift Package `IntrinsicDesign` (from `swift/`)
- **Integration:** git submodule at `design/` for token source, patterns, voice (optional for web deploy)

## Consequences

- Token changes release from `design` on its own semver tags → publish workflow
- Product repos pin npm version in `package.json`; bump on design releases
- CI/deploy: GitHub Packages auth (`NODE_AUTH_TOKEN` / `GITHUB_TOKEN`); submodule for iOS and token editing
- Agents read one canonical path for patterns and tokens

## Supersedes

- `packages/design/` inside tasteful monorepo (removed)
- Hand-maintained CSS variables in keystone/website (migrated to themes)
