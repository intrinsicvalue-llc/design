# Changelog

Release history for **Intrinsic Design** and `@intrinsic/tokens-css`.

Canonical source: `changelog/releases.json`. Store `releasedAt` in UTC with a trailing `Z` (`npm run changelog:now`).
Versions match git tags on `intrinsicvalue-llc/design`.

## v1.0.5

**Released:** 2026-06-13T23:11:08Z

### Keystone admin console typography

Semantic type roles and compose utilities for keystone.intrinsicvalue.llc — tables, tabs, and monospace IDs at a readable admin scale instead of ad-hoc text-xs and text-sm.

**Added**
- Keystone typography tokens: body, label, tab, tableCell, tableCode (15px body; labels at 14px).
- keystone.utilities.css — .iv-body, .iv-label, .iv-tab, .iv-table, .iv-table-code.
- Foundation mono font stack (--intrinsic-font-mono) for ID and audit columns.
- Users list acceptance specimen on the reference site /themes page.

**Documented**
- Admin console typography rules in patterns/LIST_DETAIL.md.

**Migration**
- Bump @intrinsic/tokens-css to ^1.0.5.
- Import @intrinsic/tokens-css/keystone.utilities.css after the Keystone theme.
- Replace text-xs / text-sm in admin UI with .iv-* classes.

---

## v1.0.4

**Released:** 2026-06

### Version badge sync

The reference site reads its version from npm/tokens-css/package.json so the homepage always matches the published package.

**Changed**
- Reference site version badge reads from the published tokens-css package.

---

## v1.0.2

**Released:** 2026-06

### Reliable token publishing

GitHub Actions can publish @intrinsicvalue-llc/tokens-css without a separate npm PAT when org workflow permissions are configured.

**Fixed**
- Publish workflow auth for GitHub Packages.
- Tokens publish via GITHUB_TOKEN from the design repo.

---

## v1.0.1

**Released:** 2026-06

### First GitHub Packages release

Web apps install design tokens from GitHub Packages using the @intrinsic/tokens-css npm alias.

**Added**
- First publish of @intrinsicvalue-llc/tokens-css to GitHub Packages.

---

## v1.0.0

**Released:** 2026-06

### Intrinsic Design launch

Company-wide tokens, themes, patterns, voice, and ADRs — with generated CSS, npm package, Swift SPM, and the reference site.

**Added**
- Foundation tokens and product themes (Tasteful, Keystone, intrinsic-www).
- Generated CSS (dist/, npm/tokens-css) and IntrinsicDesign Swift package.
- Pattern and voice specs; reference site at design.intrinsicvalue.llc.

---
