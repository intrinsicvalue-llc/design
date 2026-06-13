# Consuming Intrinsic Design

Intrinsic Design splits into **three channels**. Use only what your product needs.

| Channel | What | Web apps | iOS apps |
|---------|------|----------|----------|
| **CSS tokens** | `@intrinsic/tokens-css` on GitHub Packages | **Required** | — |
| **Swift tokens** | `IntrinsicDesign` SPM (`swift/`) | — | **Required** |
| **Patterns / voice / ADRs** | [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc) + this repo | Link | Link |

---

## Web — `@intrinsic/tokens-css` (GitHub Packages)

**Canonical for all web production builds.** Vercel and CI must never depend on cloning this repo.

Package publishes as **`@intrinsicvalue-llc/tokens-css`**; product repos use an **npm alias** so CSS imports stay `@intrinsic/tokens-css/...`.

### Setup (every web product repo)

**`.npmrc`** (commit in repo):

```ini
@intrinsicvalue-llc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**`package.json`:**

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.3"
```

**CSS** (`globals.css`):

```css
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/keystone.theme.css";
```

### Auth by environment

| Environment | Token |
|-------------|--------|
| Local dev | `export NODE_AUTH_TOKEN=<PAT with read:packages>` |
| GitHub Actions | Repo secret **`NODE_AUTH_TOKEN`** (cross-repo package read) or `GITHUB_TOKEN` when consuming from same org with correct permissions |
| Vercel | Project env **`NODE_AUTH_TOKEN`** |

Publishing: [`PUBLISH_TOKENS_CSS.md`](PUBLISH_TOKENS_CSS.md).

### GitHub Actions (web product repo — no submodule)

```yaml
permissions:
  contents: read
  packages: read

- uses: actions/checkout@v5
- uses: actions/setup-node@v5
  with:
    node-version: "22"
    registry-url: https://npm.pkg.github.com
    scope: "@intrinsicvalue-llc"
    cache: npm
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NODE_AUTH_TOKEN }}
- run: npm ci
- run: npm run build
```

---

## Which repos submodule `design/`?

| Repo | Submodule? | Why |
|------|------------|-----|
| **keystone** | **No** | Web-only admin portal |
| **intrinsic-www** (website) | **No** | Web-only marketing site |
| **tasteful** | **Yes** | iOS needs local SPM path `design/swift` |
| **venn-gogh** | TBD | Submodule when iOS ships |

**Web-only repos:** consume CSS from GitHub Packages; read patterns/voice on [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc). Clone `intrinsicvalue-llc/design` separately when **editing** tokens — do not vendor it in the product repo.

**tasteful (monorepo):**

```bash
git submodule update --init --recursive   # iOS + local token editing
```

iOS CI jobs that build Xcode need `submodules: recursive`. **Web deploy jobs do not.**

---

## Swift Package (IntrinsicDesign)

**tasteful** (`apps/ios`): Xcode → Add Local Package → `design/swift` (submodule at repo root).

```swift
import IntrinsicDesign
```

Future: publish SPM to a registry and drop the submodule for iOS — not required today.

---

## Release loop

1. Edit `tokens/*.json` in **`intrinsicvalue-llc/design`** → `npm run build` → commit generated artifacts.
2. Tag semver: `git tag v1.0.4 && git push origin v1.0.4`
3. **Publish tokens-css** workflow ships `@intrinsicvalue-llc/tokens-css@1.0.4`
4. Each web product repo bumps:

   ```json
   "@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.4"
   ```

5. **tasteful only:** advance `design/` submodule pointer after token/Swift changes.

Product repos **never fork** token JSON or generated CSS.

---

## Org layout

```
intrinsicvalue-llc/
├── design           ← source of truth; publishes @intrinsicvalue-llc/tokens-css
├── tasteful         ← submodule (iOS) + npm alias (web apps)
├── keystone         ← npm alias only
├── intrinsic-www    ← npm alias only
└── venn-gogh        ← (future)
```

**Human reference:** [design.intrinsicvalue.llc](https://design.intrinsicvalue.llc)
