# Copy standards — Intrinsic Value

Voice is part of the design system. Tokens make UI consistent; these rules make **language** consistent.

## Tone

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Clarity** | One idea per sentence | Jargon stacks, hedge words |
| **Confidence** | State what happened + next step | "Oops!", "Uh oh", fake friendliness |
| **Respect** | User agency, opt-in | Guilt, urgency, dark patterns |
| **Brevity** | Short labels; details on tap | Wall-of-text errors |

Typography roles for labels and fine print: `footnote`, `caption`, `label` in `tokens/foundation.json` — see `patterns/TYPOGRAPHY.md`.

Canonical ethics: `docs/FOUNDATION/ETHICAL_BOUNDARIES.md`

## Error messages (shape)

Every error users see:

1. **What happened** (plain language)
2. **What they can do** (one action)

```
Couldn't sync meals. Check your connection and try again.
```

Not: `Error 503: upstream unavailable`

## Success messages

Past tense, specific, no exclamation spam:

```
Meal saved.
Recipe imported.
```

## Banned in user-facing copy

| Ban | Use instead |
|-----|-------------|
| Operator (Keystone) | Admin |
| 360 / customer 360 | User detail page |
| Users (ambiguous list) | People (Keystone) |
| Oops / Uh oh | Direct statement |
| Limited time / Act now | (omit — no false urgency) |
| Upgrade now or lose… | Honest feature description |

## Links

- **Tasteful:** Primary-colored text is accent on interactive controls only; body links use `.primary` / default text — see `DESIGN_SYSTEM.md`
- **Legal:** Full URLs in `AppURLs`; ownership line: `© {year} Intrinsic Value LLC`

## Localization

- New user-visible strings → String Catalog (iOS) / centralized constants (web)
- Entity names in `ENTITY_NAMES.md` are glossary keys for translators

## Product-specific

- **Meal occasion:** "Add someone to this meal" — not recipe collaborator (`docs/FOUNDATION/HOUSEHOLD_MODEL.md`)
- **Keystone:** See `ENTITY_NAMES.md` — never blur Admin / User / Household
