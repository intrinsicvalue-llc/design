# @intrinsicvalue-llc/tokens-css

CSS design tokens for Intrinsic Value web apps. Generated from `intrinsicvalue-llc/design`.

Published to **GitHub Packages** as `@intrinsicvalue-llc/tokens-css`. Product repos depend via npm alias as `@intrinsic/tokens-css`.

## Install (product repos)

**`.npmrc`:**

```ini
@intrinsicvalue-llc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**`package.json`:**

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.0"
```

```bash
export NODE_AUTH_TOKEN=ghp_...   # read:packages
npm install
```

See [`docs/CONSUMPTION.md`](../../docs/CONSUMPTION.md) and [`docs/PUBLISH_TOKENS_CSS.md`](../../docs/PUBLISH_TOKENS_CSS.md).

## Local development (design repo)

```bash
npm install file:../npm/tokens-css   # docs-site and sibling paths
```

## Usage (Tailwind v4)

```css
@import "tailwindcss";
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/tasteful-app.theme.css";
```

Semantic variables: `var(--color-tasteful-accent)`, `var(--intrinsic-space-md)`.

Keystone admin console utilities:

```css
@import "@intrinsic/tokens-css/keystone.utilities.css";
```

Classes: `.iv-body`, `.iv-label`, `.iv-tab`, `.iv-table`, `.iv-table-code`.
