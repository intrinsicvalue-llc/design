# Pattern: Destructive action

**Universal** — delete, remove, sign out, revoke access.

## Visual

- Color: `IntrinsicColorRole.critical` / `--color-*-error` / `.red`
- Never accent color for destructive
- Placement: overflow menu or dedicated section — not primary toolbar hero

## Confirmation

Always confirm irreversible actions:

```
Title: Delete meal?
Message: This can't be undone.
Actions: Delete (destructive) · Cancel
```

## Keystone

- Admin writes append to `keystone.audit_log`
- Confirm shows entity identifier (user id, household id) — not PII dump

## Copy

- Button: **Delete**, **Remove**, **Sign Out** — verb matches outcome
- Success: past tense ("Meal deleted.")
- No guilt language

## iOS

```swift
.confirmationDialog("Delete meal?", isPresented: $showDelete, titleVisibility: .visible) {
    Button("Delete", role: .destructive) { deleteMeal() }
    Button("Cancel", role: .cancel) {}
}
```

## Web

- Native `<dialog>` or accessible modal
- Focus trap; return focus on dismiss
