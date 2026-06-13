# Consuming Intrinsic Design

## Web — `@intrinsic/tokens-css` (GitHub Packages)

Production builds install published CSS tokens from GitHub Packages. The package publishes as **`@intrinsicvalue-llc/tokens-css`** (GitHub scope rule); apps depend via **npm alias** so imports stay `@intrinsic/tokens-css/...`.

### Product repo setup

**`.npmrc`** (commit in each product repo):

```ini
@intrinsicvalue-llc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**`package.json`** (Keystone, website — repo root):

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.0"
```

**Tasteful** (`apps/app`, `apps/www`):

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.0"
```

**CSS** (`globals.css`):

```css
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/keystone.theme.css";
```

Pin exact version in lockfile; bump when design repo tags a release.

### Auth by environment

| Environment | Token |
|-------------|--------|
| Local dev | `export NODE_AUTH_TOKEN=<PAT with read:packages>` |
| GitHub Actions | `GITHUB_TOKEN` via `setup-node` + `registry-url` (see below) |
| Vercel | Project env **`NODE_AUTH_TOKEN`** — PAT with `read:packages` |

Publishing and release tags: [`PUBLISH_TOKENS_CSS.md`](PUBLISH_TOKENS_CSS.md).

### GitHub Actions (product repo)

```yaml
permissions:
  contents: read
  packages: read

- uses: actions/setup-node@v4
  with:
    node-version: "22"
    registry-url: https://npm.pkg.github.com
    scope: "@intrinsicvalue-llc"
    cache: npm
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

- run: npm ci
```

Submodule checkout is **optional** for web builds (tokens come from the registry). Keep the submodule for theme JSON, patterns, voice, and Swift.

---

## Git submodule (theme source + iOS)

Each product repo vendors the design repo at `design/` for **source tokens**, docs, and Swift:

```bash
git submodule add https://github.com/intrinsicvalue-llc/design.git design
git submodule update --init --recursive
```

**CI** (when submodule needed — iOS, token editing, `check_design_tokens.sh`):

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

**Local token changes** (before tagging a release):

```bash
cd design && npm run build
# tag + push design repo → publish workflow ships npm package
```

---

## Swift Package (IntrinsicDesign)

**tasteful** (`apps/ios`): local package path `../../design/swift` (submodule at repo root).

Xcode → Add Local Package → `design/swift`.

```swift
import IntrinsicDesign
```

---

## Pinning releases

When design repo tags **`v1.1.0`**:

1. Publish workflow ships **`@intrinsicvalue-llc/tokens-css@1.1.0`**
2. Product repos bump dependency:

   ```json
   "@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.1.0"
   ```

3. Optional: advance submodule pointer for theme JSON / Swift

---

## Org layout

```
intrinsicvalue-llc/
├── design          ← tokens, publish @intrinsicvalue-llc/tokens-css
├── tasteful        ← submodule: design/ + npm alias
├── keystone        ← submodule: design/ + npm alias
├── website         ← submodule: design/ + npm alias
└── venn-gogh       ← submodule: design/ + npm alias
```

Product repos do not fork token JSON. Web builds do not require submodule clone if GitHub Packages auth is configured.
