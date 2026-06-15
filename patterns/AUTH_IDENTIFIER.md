# Pattern: Identifier-first auth

**Universal** — email (or username) step → adaptive credentials (sign-in / create / passkey).

Applies to Tasteful iOS (`AuthenticationView`), product web (`LoginPageClient`), and future Intrinsic apps with password/passkey auth.

## Principles (non-negotiable)

1. **Platform HIG beats custom chrome** (`principles/FOUNDATION.md`) — native `Form` fields, editor sheets, toolbar Cancel, swipe-to-dismiss on iOS.
2. **Sub-tasks are sheets** (`patterns/EDITOR_SHEET.md`) — changing identity, reset password, or any “leave the default” flow is a **modal with Cancel**, not in-place layout morph on the parent.
3. **Reversible by default** — dismiss sheet = parent state unchanged (saved email chip still there).
4. **Identifier-first copy** — read-only email row shows trailing **Change** (opens sheet); VoiceOver / sheet context use **Use a Different Email**; not “Use Another Account” unless showing a **multi-account list**.
5. **Trust** — legal consent on email + create-account steps only; footnote/`text-sm` secondary tier, not caption/`text-xs`.

## iOS — screen states

| State | UI | Notes |
|-------|-----|-------|
| No saved email | Email field on main + Continue | First launch |
| Saved email (returning) | Read-only row: email + trailing **Change** + Continue | First launch / email step only |
| Post sign-out | **Credentials** — passkey-first when account has enrolled passkeys + **Use Password Instead**; password-first when none; email row + **Change**; no auto Face ID | `preferIdentifierStepOnNextAuth` + `shouldUsePasskeyFirst` |
| Different email | **`DifferentEmailEntrySheet`** / web modal — **Change** opens sheet; Close restores parent |
| Credentials | Email row + **Change** + passkey (when enrolled) or password; password screen shows **Sign In with Passkey** only when passkeys exist — direct ceremony, no layout swap |
| Forgot password | **`ForgotPasswordView`** sheet | Canonical specimen |

### Dismiss (iOS auth sheets)

- **×** in **top-trailing** toolbar (`AuthSheetDismissButton`) — matches Settings, Account, compose sheets in Tasteful
- Swipe down remains available
- Not leading **Close** / **Cancel** text on dismiss-only sheets

### Primary actions (validation)

See **`patterns/PRIMARY_ACTION.md`** (universal). Auth-specific specimens below.

### Hard bans (iOS)

- ❌ `.toolbarRole(.editor)` on single-screen dismiss-only sheets — editor role expects **Cancel + confirmation** in the toolbar; otherwise iOS 26 may show spurious back chrome beside Cancel
- ❌ `Form` inside `ScrollView` on auth screens — email, password, and create-account fields collapse to zero height on device
- ❌ Morph main auth layout when user changes email — **always** sheet/modal via **Use a Different Email**
- ❌ Hand-built rounded `TextField` chrome when `Form` works (use Form **inside sheet**; main email step may use plain field only when Form-in-ScrollView collapses — prefer chip + sheet instead)
- ❌ Skinny text-only “Back to …” as the only escape from a sub-task
- ❌ Clear parent `email` before user commits in sheet
- ❌ “Use Another Account” on single-saved-email chip

### Canonical specimens (Tasteful)

- `AuthenticationView.swift` — chip + `DifferentEmailEntrySheet`
- `ForgotPasswordView` — reset flow (same sheet vocabulary)
- `AuthCopy.swift` / `auth-progressive.ts` — shared copy

## Web

| State | UI |
|-------|-----|
| Saved email | Row: email + trailing **Change** |
| Different email | Modal dialog with **Cancel** + backdrop dismiss |
| Legal | `APP_URLS` → `https://tasteful.to/terms`, `https://tasteful.to/privacy` |

## Agent checklist (before shipping auth UI)

- [ ] Compared to `ForgotPasswordView` / `DifferentEmailEntrySheet` sheet pattern
- [ ] Sub-task dismiss restores parent without data loss
- [ ] Copy synced iOS ↔ web (`AuthCopy` / `AUTH_COPY`)
- [ ] No archive `DESIGN_SYSTEM.md` — Intrinsic Design repo + live site only
- [ ] Device test: sign-out → passkey-first credentials → **Change** → dismiss → email restored
