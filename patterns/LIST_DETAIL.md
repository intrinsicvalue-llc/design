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

**Detail page titles (Keystone copy):** singular — **User detail**, **Admin detail**, **Feedback detail**, **Household detail** (not "details", not "360").

**Detail tabs (web):** URL search param `?tab=` on the same route — e.g. `/users/[id]?tab=support`. First tab (Overview) uses the bare `/users/[id]` path. Use horizontal tab nav with `--keystone-line` / accent underline; one tab active at a time.

## Keystone (canonical)

```
KeystoneShell
├── Pulse
├── Operate → People → User detail
├── Operate → Tasteful → Households → Household detail
└── Platform → Admins → Admin detail
```

No combined "360" views. List and detail are separate routes.

## iOS

- `NavigationStack` push for detail
- Sort: `Menu { Picker(...) }` — not hand-rolled checkmark buttons
- Row: full-width tap target, `.contentShape(Rectangle())` if custom buttons

## Web

- `/entity` list, `/entity/[id]` detail
- Table or card list; consistent `--color-*-line` borders

## Keystone admin console — typography

Audience: `@intrinsicvalue.llc` admins using **Keystone** (`keystone.intrinsicvalue.llc`). Dense data UI, not consumer marketing type.

**Source:** `tokens/themes/keystone.json` → `@intrinsic/tokens-css/keystone.theme.css` + `keystone.utilities.css`

### Semantic roles

| Role | Token | Use |
|------|-------|-----|
| Body | `body` (15px) | Page descriptions, search inputs, empty states, footer notes, session email |
| Page title | `pageTitle` (30px, semibold) | Route `<h1>` — Users, Admins, User detail (not shell brand) |
| Label | `label` (14px, medium) | Section headings (`Recent users (n)`), table column headers, uppercase breadcrumbs |
| Tab | `tab` (15px, medium) | Shell nav and detail `?tab=` nav |
| Table cell | `tableCell` (15px) | Table body — **never below body size** |
| Table code | `tableCode` (15px, mono) | Public IDs (`USR-*`), UUIDs, audit actions — **same size as body**, not a step smaller |

### Rules

1. **No ad-hoc `text-xs` / `text-sm`** in Keystone feature code — use `.iv-*` utilities or Tailwind `text-keystone-*` from `@theme`.
2. **Tables:** wrap with `.iv-table`; monospace cells use `.iv-table-code` (class on `<td>` or inner `<span>`).
3. **Tabs:** shell nav links and detail tabs use `.iv-tab` (+ color/active classes).
4. **Page titles:** list and detail route `<h1>` use `.iv-page-title` — not `text-2xl`.
5. **Monospace audit/ID columns** stay at `tableCode` size even in `<dl>` metadata blocks outside tables.

### Compose (CSS)

```css
@import "@intrinsic/tokens-css/keystone.theme.css";
@import "@intrinsic/tokens-css/keystone.utilities.css";
```

```html
<nav class="iv-tab …">Home</nav>
<h1 class="iv-page-title">Users</h1>
<p class="iv-body text-[var(--color-keystone-muted)]">Description</p>
<p class="iv-label font-medium text-[var(--color-keystone-muted)]">Recent users (25)</p>
<table class="iv-table …">
  <thead><tr><th>Email</th><th>ID</th></tr></thead>
  <tbody><tr><td>…</td><td class="iv-table-code">USR-G8VBDV</td></tr></tbody>
</table>
```

Tailwind v4 (optional): `text-keystone-body`, `text-keystone-label`, `text-keystone-tab`, `text-keystone-table-cell`, `text-keystone-table-code`.

**Acceptance:** Keystone theme specimen on [design.intrinsicvalue.llc/themes](https://design.intrinsicvalue.llc/themes) — Users list mock at readable scale.

## Empty list

Fall through to `EMPTY_STATE.md` — never a blank screen.

## References

- `docs/KEYSTONE.md` — page structure (keystone repo)
- `RestaurantsView.swift`, `MealsView.swift` — Tasteful lists
