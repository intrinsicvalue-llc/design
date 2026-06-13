# Consuming Intrinsic Design

## Git submodule (recommended for product repos)

Each product repo vendors the design repo at `design/`:

```bash
cd tasteful   # or keystone, website, venn-gogh
git submodule add git@github.com:intrinsicvalue-llc/design.git design
git submodule update --init --recursive
```

**CI:** checkout with submodules:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

## npm (@intrinsic/tokens-css)

From a product repo with submodule at `./design`:

```json
"@intrinsic/tokens-css": "file:../../design/npm/tokens-css"
```

Paths:

| Product repo | package.json location | file: path |
|--------------|----------------------|------------|
| tasteful `apps/app` | `apps/app/package.json` | `file:../../design/npm/tokens-css` |
| tasteful `apps/www` | `apps/www/package.json` | `file:../../design/npm/tokens-css` |
| keystone | `package.json` | `file:../design/npm/tokens-css` |
| website | `package.json` | `file:../design/npm/tokens-css` |

After `npm install`, import in `globals.css`:

```css
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/tasteful-app.theme.css";
```

Run `npm run build --prefix design` (or `cd design && npm run build`) before web builds if tokens changed.

## Swift Package (IntrinsicDesign)

**tasteful** (`apps/ios`): local package path `../../design/swift` (submodule at repo root).

Xcode → Add Local Package → `design/swift`.

In Swift sources:

```swift
import IntrinsicDesign
```

## Pinning releases

When design repo tags `v1.1.0`:

```bash
cd design && git checkout v1.1.0
```

Or npm from tag:

```json
"@intrinsic/tokens-css": "github:intrinsicvalue-llc/design#v1.1.0"
```

## Org layout

```
intrinsicvalue-llc/
├── design          ← this repo
├── tasteful        ← submodule: design/
├── keystone        ← submodule: design/
├── website         ← submodule: design/
└── venn-gogh       ← submodule: design/
```

Product repos never contain `packages/design/` — only a submodule pointer and dependency pins.
