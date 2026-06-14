# Intrinsic Design

**GitHub:** `intrinsicvalue-llc/design` · **Site:** [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc)

Tokens, patterns, and themes for Intrinsic Value apps.

Pattern-first, platform-native design foundation for every Intrinsic Value product. Tokens are law; themes express personality; patterns define behavior.

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
| Web | `@intrinsicvalue-llc/tokens-css` on [npm](https://www.npmjs.com/package/@intrinsicvalue-llc/tokens-css) (alias `@intrinsic/tokens-css` in apps) |
| Apple | Swift package `swift/` → `IntrinsicDesign` |

See [`docs/CONSUMPTION.md`](docs/CONSUMPTION.md) for GitHub Packages, iOS submodule, and CI by repo type.

## New app

1. Add `tokens/themes/<app>.json`
2. `npm run build` && commit
3. Tag release
4. Wire npm + SPM in product repo

Details: [`docs/README.md`](docs/README.md).
