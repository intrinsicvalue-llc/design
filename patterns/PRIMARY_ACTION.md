# Pattern: Primary action (forms)

**Universal** — every product, every platform. Auth is one consumer; compose sheets, onboarding, and settings forms follow the same rules.

## Rule

**Primary actions stay visually enabled.** Validate on tap. Explain failures inline.

Disable a primary control **only** when the action is impossible — not when the user simply hasn’t finished typing.

| Disable primary? | Examples |
|------------------|----------|
| **Yes** | Request in flight (`isLoading`), passkey ceremony running, truly no-op (empty list export) |
| **No** | Email empty, password too short, required field missing — tap → inline footnote error |

## Why (iOS 26+ Liquid Glass)

`.glassProminent` + `.disabled` washes out to low-contrast grey-on-grey. It reads as **broken UI**, not “waiting for input.” That violates **Accessibility** and **Clarity first** (`principles/FOUNDATION.md`).

Apple’s modern form pattern: enabled-looking primary + feedback on submit. Live requirement rows (checkmarks) are fine for multi-field sign-up.

## iOS

```swift
// ✅ Primary glass — always full strength; validate in action
Button("Continue") { submit() }
    .buttonStyle(.glassProminent)
    .tint(accent)
    .disabled(isLoading)  // in-flight only

private func submit() {
    guard isValid else {
        inlineMessage = "Enter a valid email address."
        return
    }
    inlineMessage = nil
    // …
}
```

```swift
// ❌ Do not — illegible on device
.disabled(!isValidEmail)
```

- Inline errors: `.footnote`, `.red` or semantic error role
- Shape: `voice/COPY_STANDARDS.md` (what happened + what to do)

## Web

- Primary button stays full opacity; `disabled` only while `loading`
- Invalid submit → `role="alert"` message adjacent to the field or button
- Do not rely on `disabled:opacity-45` as validation UX for primary CTAs

## Relationship to other patterns

| Pattern | Notes |
|---------|--------|
| `EDITOR_SHEET.md` | Save/checkmark in toolbar: same rule for **body** glass primaries; toolbar confirmation may use system disabled when platform provides legible chrome |
| `AUTH_IDENTIFIER.md` | Auth specimens; must comply with this pattern |
| `liquid-glass-ui.mdc` | Glass vocabulary; no bordered fallbacks |

## Specimens (Tasteful)

- `AuthenticationView` — Continue / Sign In
- `DifferentEmailEntrySheet` — sheet Continue
- `ForgotPasswordView` — Send Reset Link
