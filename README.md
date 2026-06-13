# Intrinsic Design

**GitHub:** `intrinsicvalue-llc/design` · **Site:** [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc)

Company-wide tokens, patterns, voice, and ADRs for every Intrinsic Value product.

**Documentation:** [`docs/README.md`](docs/README.md)

## Quick start

```bash
npm run build
npm run check
npm run docs:dev   # → http://localhost:3002
```

## Consumption

| Platform | Package |
|----------|---------|
| Web | `@intrinsic/tokens-css` |
| Apple | Swift package `swift/` → `IntrinsicDesign` |

See [`docs/CONSUMPTION.md`](docs/CONSUMPTION.md) for submodule and CI setup in product repos.

## New app

1. Add `tokens/themes/<app>.json`
2. `npm run build` && commit
3. Tag release
4. Wire npm + SPM in product repo

Details: [`docs/README.md`](docs/README.md).
