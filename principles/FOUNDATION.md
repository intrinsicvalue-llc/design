# Design principles — Intrinsic Foundation

Company-wide principles. Product themes (`tasteful`, `keystone`) express personality **within** these bounds.

## Core principles

1. **Clarity first** — One clear purpose per screen
2. **Platform-native** — HIG on Apple; don't fight system materials
3. **Accessibility** — Dynamic Type, VoiceOver, contrast, hit targets ≥ 44pt
4. **Performance** — Beautiful doesn't mean slow; no blocking HUD unless necessary
5. **Trust** — Privacy-safe, no dark patterns (`ETHICAL_BOUNDARIES.md`)

## Token discipline

- Use `IntrinsicSpacing`, `IntrinsicRadius`, `IntrinsicTypography`, `--color-*` semantic variables
- Prefer system semantic colors (`.primary`, `.secondary`) over custom palettes on Apple
- User accent on Tasteful iOS is intentional; don't hardcode pink in Swift feature code

## Typography

- **Consumer apps:** semantic roles in `tokens/foundation.json` — see `patterns/TYPOGRAPHY.md`
- **iOS:** `IntrinsicTypography` → Apple Text Styles; Dynamic Type is non-negotiable
- **Web:** `foundation.utilities.css` `.iv-*` classes; no ad-hoc `text-xs` / `text-sm` in consumer UI
- **Keystone admin:** theme-scale typography in `keystone.json` (denser, separate ADR tier)
- **Hierarchy:** de-emphasize with role + `.secondary` / muted color — never shrink body for metadata

## Agent & CI enforcement

- `.cursor/rules/intrinsic-design-tokens.mdc`
- `.cursor/rules/swiftui-typography.mdc` (iOS)
- `.cursor/rules/liquid-glass-ui.mdc` (iOS)
- `scripts/check_design_tokens.sh`

## When principles conflict

**Accessibility beats aesthetics.**  
**Trust beats engagement.**  
**Platform HIG beats brand novelty** on navigation chrome and selection controls.  
**Legible primary actions beat disabled glass** — see `patterns/PRIMARY_ACTION.md`.

Document exceptions in `adr/DESIGN_ADR.md`.
