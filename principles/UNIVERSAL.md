# Universal patterns — every app, every platform

These are **non-negotiable** across Tasteful, Keystone, Venn Gogh, and future products. Implement natively per platform; don't share UI components across Swift and React.

## 1. List → Detail

See `patterns/LIST_DETAIL.md`

## 2. Editor sheet / compose

See `patterns/EDITOR_SHEET.md`

## 3. Empty states

See `patterns/EMPTY_STATE.md`

## 4. Destructive actions

See `patterns/DESTRUCTIVE_ACTION.md`

## 5. Error presentation

What happened + what to do. No error codes alone. (`voice/COPY_STANDARDS.md`)

## 6. Loading

Prefer inline skeleton or subtle progress. Full-screen blocking spinner only when the entire screen is unusable.

## 7. Offline / sync honesty

Never imply success before persistence. Copy must match sync model (`docs/FOUNDATION/` sync docs).

## 8. PII-safe telemetry

No emails, locations, or meal content in logs. (`docs/FOUNDATION/OBSERVABILITY.md`)

## 9. Permissions

User-initiated only; no startup permission spam. (`ETHICAL_BOUNDARIES.md`)

## 10. No enshittification

No ads, manipulative urgency, or tier-gated core utility. Tasteful `/comparison` covenant applies to tone company-wide.

## Adding a universal pattern

1. Add `patterns/<NAME>.md` with platform notes
2. Add Cursor rule or CI check if machine-enforceable
3. Log in `DESIGN_ADR.md` if non-obvious
