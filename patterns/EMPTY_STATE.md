# Pattern: Empty state

**Universal** — every list, search, and filter result set.

## Anatomy

1. **Icon or mark** — subtle, `.secondary` / muted color (not accent unless interactive)
2. **Title** — what's empty ("No meals yet")
3. **Explanation** — one line, optional
4. **Primary action** — one CTA (`.glassProminent` on iOS)

## Rules

- Never a blank white/black screen
- Never fake loading forever — show empty or error
- Search with no results ≠ empty library — different copy

## Examples

| Context | Title | CTA |
|---------|-------|-----|
| Meals (none) | No meals yet | Log a meal |
| Search (no hits) | No results | Clear search |
| Keystone People (none) | No users match | Adjust filters |

## iOS

- Use `ContentUnavailableView` where appropriate (iOS 17+)
- Hero empty on Home may use brand illustration — still one primary action

## Tone

Encouraging, not guilt-inducing. No "You haven't logged anything in 7 days!"
