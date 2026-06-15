# Typography — semantic roles, platform-native

Intrinsic Design owns **role names and when to use them**. Each platform implements roles with its native type system — never pixel-parity across Swift and web.

**Source:** `tokens/foundation.json` → `foundation.css` + `foundation.utilities.css` (web) · `IntrinsicTypography` (Swift)

**Admin exception:** Keystone uses a denser theme scale in `tokens/themes/keystone.json` — see `patterns/LIST_DETAIL.md`.

---

## Role catalog

| Role | iOS | Web utility | Use |
|------|-----|-------------|-----|
| `largeTitle` | `.largeTitle` | `.iv-large-title` | Rare hero titles; prefer nav bar title |
| `title` | `.title` | `.iv-title` | Primary in-content screen title |
| `headline` | `.headline` | `.iv-headline` | List row primary, card titles |
| `body` | `.body` | `.iv-body` | Default reading text, descriptions |
| `callout` | `.callout` | `.iv-callout` | Callout blocks, short intros |
| `subheadline` | `.subheadline` | `.iv-subheadline` | Row subtitles, supporting copy |
| `footnote` | `.footnote` | `.iv-footnote` | Timestamps, legal hints, error fine print |
| `caption` | `.caption` | `.iv-caption` | Badges, image captions, compact secondary |
| `caption2` | `.caption2` | `.iv-caption2` | Smallest legible metadata — use sparingly |
| `label` | `.subheadline.weight(.medium)` | `.iv-label` | Section headers, form labels — **not body copy** |

`label` means **UI section label** (Intrinsic vocabulary), not Apple’s semantic color “Label”.

---

## iOS (SwiftUI)

```swift
import IntrinsicDesign

Text("Chicken Tikka")
    .font(IntrinsicTypography.headline)

Text("Last edited yesterday")
    .font(IntrinsicTypography.footnote)
    .foregroundStyle(.secondary)
```

### Rules

1. **Use `IntrinsicTypography` or `Font.TextStyle`** — never `.font(.system(size:))` in feature code.
2. **Dynamic Type is automatic** — system text styles scale with user settings.
3. **Hierarchy via style + color** — pair `footnote` / `caption` with `.secondary` or theme muted colors; don’t shrink body text for de-emphasis.
4. **Navigation titles** — use `.navigationTitle` / toolbar; reserve `largeTitle` for scroll-edge hero patterns.

---

## Web (Tailwind / CSS)

```css
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/foundation.utilities.css";
@import "@intrinsic/tokens-css/tasteful-web-app.theme.css";
```

```html
<h2 class="iv-headline">Chicken Tikka</h2>
<p class="iv-body text-[var(--color-tasteful-muted)]">Serves 4 · 45 min</p>
<p class="iv-footnote text-[var(--color-tasteful-muted)]">Last edited yesterday</p>
```

### Rules

1. **No ad-hoc `text-xs` / `text-sm`** in consumer feature code — use `.iv-*` or Tailwind `text-intrinsic-*` from `@theme`.
2. **Respect user zoom** — role sizes are reference defaults at 1×; avoid locking `px` in inline styles.
3. **Mono is separate** — IDs and code use `--intrinsic-font-mono`, not a smaller body step.
4. **Keystone admin** — use `keystone.utilities.css` instead of foundation utilities.

Tailwind v4: `text-intrinsic-body`, `text-intrinsic-footnote`, `font-intrinsic-headline`, etc.

---

## Android (when shipping)

Map the same role names to Material 3 typography in product code. Document mapping in ADR-011; no generated artifacts until a consumer Android app ships.

| Intrinsic | Material 3 |
|-----------|------------|
| `largeTitle` | `displayLarge` |
| `title` | `titleLarge` |
| `headline` | `titleMedium` |
| `body` | `bodyLarge` |
| `callout` | `bodyMedium` |
| `subheadline` | `bodySmall` |
| `footnote` | `labelSmall` |
| `caption` | `labelMedium` |
| `caption2` | `labelSmall` (muted) |
| `label` | `labelLarge` |

---

## List row hierarchy (acceptance)

```
[ headline ]          Primary entity name
[ subheadline ]       One-line context (optional)
[ footnote ]          Timestamp or tertiary metadata — .secondary / muted
```

## Copy pairing

Short on-screen labels; details on tap (`voice/COPY_STANDARDS.md`). Error fine print uses `footnote`, never `caption2` for primary messaging.

**Acceptance:** Foundation typography specimen on [design.intrinsicvalue.llc/foundation](https://design.intrinsicvalue.llc/foundation).
