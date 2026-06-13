# Pattern: List → Detail

**Universal** — Tasteful, Keystone, every future entity browser.

## Structure

```
Shell (tabs or sidebar)
└── ListPage
    ├── search / filter (optional)
    ├── sort (Menu + Picker on iOS; menu on web)
    └── rows → navigate to DetailPage
DetailPage
    ├── title + metadata header
    ├── tabs or sections (not "360")
    └── actions in toolbar (edit, destructive in overflow)
```

## Keystone (canonical)

```
KeystoneShell
├── Pulse
├── Operate → People → User detail
├── Operate → Tasteful → Households → Household detail
└── Platform → Operators
```

No combined "360" views. List and detail are separate routes.

## iOS

- `NavigationStack` push for detail
- Sort: `Menu { Picker(...) }` — not hand-rolled checkmark buttons
- Row: full-width tap target, `.contentShape(Rectangle())` if custom buttons

## Web

- `/entity` list, `/entity/[id]` detail
- Table or card list; consistent `--color-*-line` borders

## Empty list

Fall through to `EMPTY_STATE.md` — never a blank screen.

## References

- `docs/KEYSTONE.md` — page structure (keystone repo)
- `RestaurantsView.swift`, `MealsView.swift` — Tasteful lists
