# Pattern: Editor sheet

**Universal** — create/edit flows in a modal sheet with explicit save/cancel.

## iOS (Tasteful)

```swift
NavigationStack {
    // fields only — no duplicate title chrome
}
.toolbarRole(.editor)
.toolbar {
    ToolbarItem(placement: .cancellationAction) {
        Button("Cancel", role: .cancel) { dismiss() }
            .foregroundStyle(.primary)  // never accent on dismiss
    }
    ToolbarItem(placement: .confirmationAction) {
        Button { save() } label: { Image(systemName: "checkmark") }
        // system glassProminent via placement — no manual .buttonStyle on confirmation
    }
}
```

## Share extension exception

`UIHostingController` host needs explicit `.buttonStyle(.glassProminent)` on Save — see `liquid-glass-ui.mdc`.

## Unified add / share flows

- Container owns mode chrome (Meal | Recipe | Restaurant segmented control)
- Child views supply fields only
- References: `UnifiedAddView`, `ShareUnifiedAddView`, `PROJECT_LEARNINGS.md`

## Web

- Modal or dedicated `/edit` route
- Primary save = prominent button; cancel = secondary
- Form fields use `--color-*-line` and `--color-*-surface`

## Save behavior

- **Body primary (glass):** keep visually enabled; validate on tap — `patterns/PRIMARY_ACTION.md`
- **Toolbar confirmation (checkmark / Done):** may use system disabled when invalid if contrast remains legible
- **Always** disable during in-flight save
- On success: dismiss + past-tense confirmation if not obvious from navigation
- On failure: error shape from `COPY_STANDARDS.md`
