# Intrinsic Design

**GitHub:** `intrinsicvalue-llc/design`  
**npm:** `@intrinsic/tokens-css`  
**Swift:** `IntrinsicDesign` (local SPM / tagged release)

Company-wide design foundation for every Intrinsic Value product — tokens, patterns, voice, and UX law. Product repos consume versioned artifacts; they do not fork spacing grids or copy standards.

## Quick start

```bash
git clone git@github.com:intrinsicvalue-llc/design.git
cd design
npm run build
npm run check
```

## Structure

```
design/
├── tokens/foundation.json       # spacing, radius, motion, status colors
├── tokens/themes/*.json         # per-product accent + semantic colors
├── build.mjs                    # generator (zero deps)
├── dist/css/                    # generated CSS (committed)
├── swift/                       # Swift Package → IntrinsicDesign
├── npm/tokens-css/              # @intrinsic/tokens-css for web
├── patterns/                    # List→Detail, Editor sheet, …
├── voice/                       # copy + entity names + voice intents
├── principles/                  # foundation + universal rules
└── adr/DESIGN_ADR.md
```

## Consumption

| Consumer | Web | Apple platforms |
|----------|-----|-----------------|
| **tasteful** | `@intrinsic/tokens-css` + tasteful-* themes | SPM `../../design/swift` (submodule) |
| **keystone** | `@intrinsic/tokens-css` + keystone theme | — |
| **website** | `@intrinsic/tokens-css` + intrinsic-www theme | — |
| **venn-gogh** | (future) theme JSON + SPM | SPM |

### Web

```css
@import "tailwindcss";
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/keystone.theme.css";
```

### iOS

```swift
import IntrinsicDesign

IntrinsicSpacing.md
IntrinsicColorRole.warning
```

Add package: **File → Add Package Dependencies → Add Local…** → `design/swift` (submodule path).

## Versioning

Semver tags on this repo (`v1.0.0`). Product repos pin:

- npm: `"@intrinsic/tokens-css": "github:intrinsicvalue-llc/design#v1.0.0"` or submodule + `file:`
- SPM: `.package(url: "https://github.com/intrinsicvalue-llc/design", from: "1.0.0")` targeting `swift/`

## New app checklist

1. Add `tokens/themes/<app>.json`
2. `npm run build` && commit
3. Tag patch/minor release
4. Wire npm + SPM in product repo
5. Add `docs/<app>.md` in product repo (personality); link here for foundation

See **`docs/CONSUMPTION.md`** for submodule and CI setup.
