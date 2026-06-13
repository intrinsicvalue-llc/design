# @intrinsic/tokens-css

CSS design tokens for Intrinsic Value web apps. Generated from `intrinsicvalue-llc/design`.

## Install

```bash
# GitHub (tag pin — production)
npm install github:intrinsicvalue-llc/design#v1.0.0

# Local sibling clone (development)
npm install file:../../../design/npm/tokens-css
```

## Usage (Tailwind v4)

```css
@import "tailwindcss";
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/tasteful-app.theme.css";
```

Semantic variables: `var(--color-tasteful-accent)`, `var(--intrinsic-space-md)`.
