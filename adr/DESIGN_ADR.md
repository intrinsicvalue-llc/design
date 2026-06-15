# Design ADR log

Architecture Decision Records for UX/UI/platform choices.  
**Format:** Date · Decision · Context · Consequence

Add a row when you choose something non-obvious that app #2 or an agent might re-litigate.

---

## ADR-001 — Liquid Glass as default iOS chrome (2026)

**Decision:** iOS 26+ uses `.glass` / `.glassProminent`; ban `.bordered` / hand-built capsule chrome.  
**Context:** Tasteful targets iOS 26 only; system materials age better than custom pills.  
**Consequence:** `.cursor/rules/liquid-glass-ui.mdc`; share extension needs explicit `.glassProminent` on Save.

## ADR-002 — Picker for single-select lists (2026)

**Decision:** `Picker` + `.pickerStyle(.inline)` in Lists; `Picker` in `Menu` for toolbars — never hand-rolled checkmark rows.  
**Context:** Full-row hit targets, accent tint, accessibility.  
**Consequence:** `.cursor/rules/swiftui-selection-lists.mdc`

## ADR-003 — Token source of truth in packages/design (2026-06)

**Decision:** `packages/design/tokens/*.json` generates CSS + Swift; no hand-edited duplicates.  
**Context:** www/app/iOS drifted on accent colors and spacing.  
**Consequence:** `npm run build --prefix packages/design`; CI `check_design_tokens.sh`

## ADR-004 — Theme-specific accents (2026-06)

**Decision:** tasteful-www = blue marketing accent; tasteful-web-app = pink product accent; iOS = user accent.  
**Context:** Editorial www vs product identity vs personalization.  
**Consequence:** Documented in `docs/design/tasteful.md`; change only via theme JSON.

## ADR-005 — Keystone indigo accent (2026-06)

**Decision:** Keystone uses `#5856d6` accent — not Tasteful pink or www blue.  
**Context:** Admin portal must feel distinct from consumer products.  
**Consequence:** `tokens/themes/keystone.json`

## ADR-006 — Intrinsic* naming over Tasteful* for foundation (2026-06)

**Decision:** Generated enums prefixed `Intrinsic*`; `Tasteful*` typealiases for back-compat.  
**Context:** Multi-app company; foundation tokens are not Tasteful-only.  
**Consequence:** New cross-app code uses `IntrinsicSpacing`, etc.

## ADR-007 — Standalone design repo (2026-06)

**Decision:** `intrinsicvalue-llc/design` is company infrastructure — not nested in tasteful.  
**Context:** Keystone, website, and future apps are separate repos; design must be a sibling dependency.  
**Consequence:** Product repos with iOS use git submodule `design/` for SPM; **web-only** repos use GitHub Packages only. See `adr/DESIGN_REPO.md` and ADR-009.

## ADR-008 — Publish web tokens to GitHub Packages (2026-06)

**Decision:** Ship `@intrinsicvalue-llc/tokens-css` on GitHub Packages; product repos install via npm alias as `@intrinsic/tokens-css`.  
**Context:** Vercel and other deploy targets cannot reliably clone private git submodules; `file:design/...` fails outside GitHub Actions. GitHub Packages scope must match org name.  
**Consequence:** Tag `v*.*.*` triggers publish workflow; `CONSUMPTION.md` + `PUBLISH_TOKENS_CSS.md`; web CI/deploy uses npm only; CSS import paths unchanged via alias.

## ADR-009 — Web-only repos do not submodule design (2026-06)

**Decision:** Keystone and intrinsic-www (and future web-only repos) do **not** vendor `design/` as a git submodule.  
**Context:** ADR-008 made submodules unnecessary for web builds; duplicate `design/` copies caused agent confusion, stale pointers, and failed local pushes.  
**Consequence:** Web-only repos consume `@intrinsic/tokens-css` + link to [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc). Only tasteful (iOS) keeps `design/` for SPM. Token edits happen in `intrinsicvalue-llc/design`, not inside product repos.

## ADR-010 — Public design repo + public npm tokens (2026-06)

**Decision:** `intrinsicvalue-llc/design` is a **public** GitHub repo. Web tokens publish to **public npm** (`@intrinsicvalue-llc/tokens-css` on registry.npmjs.org), not GitHub Packages.  
**Context:** Private submodule + `GH_SUBMODULE_PAT` broke iOS CI; `NODE_AUTH_TOKEN` on every Vercel project and web CI job created rotating-secret overhead with zero user value. Philosophy, tokens, and ADRs are already public on design.intrinsicvalue.llc.  
**Consequence:** No `GH_SUBMODULE_PAT`, no `NODE_AUTH_TOKEN` for token installs. Product repos drop `.npmrc` auth. Publish workflow uses **`NPM_TOKEN`** on the design repo only. Supersedes ADR-008 consumption/auth paths; publish registry moves from GitHub Packages to npm.

## ADR-011 — Semantic typography roles, platform-native (2026-06)

**Decision:** Consumer typography uses **semantic role names** in `tokens/foundation.json` (`largeTitle` … `label`). iOS maps roles to `Font.TextStyle` via generated `IntrinsicTypography` (Dynamic Type, no px tokens). Web maps the same roles to CSS vars + `.iv-*` utilities in `foundation.utilities.css`. Dense admin (Keystone) keeps a separate theme scale.  
**Context:** Agents and product repos reached for archived markdown and ad-hoc `text-xs`/`text-sm` because only font stacks existed at foundation level. Apple HIG fidelity requires system text styles on iOS; web/Android need shared vocabulary without fighting platform type systems.  
**Consequence:** `patterns/TYPOGRAPHY.md`; `.cursor/rules/swiftui-typography.mdc`; ban `.font(.system(size:))` on iOS and raw Tailwind size steps on consumer web. Parity is **semantic** (role names + hierarchy), not pixel-identical. Android maps roles to Material 3 in product repos until generated artifacts ship.

## ADR-012 — Primary actions validate on tap (iOS 26 glass) (2026-06)

**Decision:** Do not disable `.glassProminent` body primaries for incomplete form state. Validate on tap; inline footnote errors. Disable only in-flight.  
**Context:** Disabled glass on auth and sheets was illegible on device; `EDITOR_SHEET.md` previously said “disable save while invalid.” iOS 26 Liquid Glass exacerbates contrast loss.  
**Consequence:** `patterns/PRIMARY_ACTION.md`; `patterns/AUTH_IDENTIFIER.md`; `EDITOR_SHEET.md` save behavior updated; Tasteful `AuthenticationView` specimens.

---

*Append new ADRs at the bottom. Never delete — supersede with a new ADR that references the old one.*
