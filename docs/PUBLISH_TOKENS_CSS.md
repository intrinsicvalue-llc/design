# Publish @intrinsicvalue-llc/tokens-css

Generated CSS tokens ship as **`@intrinsicvalue-llc/tokens-css`** on [npm](https://www.npmjs.com/package/@intrinsicvalue-llc/tokens-css) (public). Product repos install via npm alias as **`@intrinsic/tokens-css`** so CSS import paths stay stable.

## Release

1. Merge token changes to `main`; ensure `npm run build` / `scripts/check_design_tokens.sh` pass.
2. Bump `npm/tokens-css/package.json` version if not tagging (optional when using tags).
3. Tag the design repo (semver, aligned with package version):

   ```bash
   git tag v1.0.8
   git push origin v1.0.8
   ```

4. Workflow **Publish tokens-css** runs on `v*.*.*` tags and publishes to npm.

Manual publish: **Actions → Publish tokens-css → Run workflow** (bump `npm/tokens-css/package.json` version first if the prior release already exists).

## Publish auth (Trusted Publishing / OIDC)

Publishes authenticate via **npm Trusted Publishing** — no long-lived `NPM_TOKEN` on GitHub.

**Package settings** on [npmjs.com/package/@intrinsicvalue-llc/tokens-css](https://www.npmjs.com/package/@intrinsicvalue-llc/tokens-css) → **Trusted Publisher** → GitHub Actions:

| Field | Value |
|--------|--------|
| Organization or user | `intrinsicvalue-llc` |
| Repository | `design` |
| Workflow filename | `publish-tokens-css.yml` |
| Environment name | *(blank)* |
| Allowed actions | **Allow npm publish** |

Workflow requirements (already in `.github/workflows/publish-tokens-css.yml`):

- `permissions.id-token: write`
- Node **24** (npm ≥ 11.5.1)
- `npm publish --access public` on GitHub-hosted runners

### If publish fails

1. Confirm Trusted Publisher fields match exactly (case-sensitive workflow filename).
2. Confirm `id-token: write` is set on the workflow.
3. Manual dispatch: bump `npm/tokens-css/package.json` version first if the version already exists on the registry.
4. Re-run workflow or push a new tag `v*.*.*`.

Consumers need **no auth** — the package is public on npmjs.org.

## Consumer setup (product repos)

**No `.npmrc` required.**

**`package.json`:**

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.8"
```

**CSS** (`globals.css`):

```css
@import "@intrinsic/tokens-css/foundation.css";
@import "@intrinsic/tokens-css/keystone.theme.css";
```

**Local dev / CI / Vercel:** `npm ci` — no `NODE_AUTH_TOKEN`.

## Scope note

npm scope matches the GitHub org: **`@intrinsicvalue-llc/tokens-css`**. The alias preserves **`@intrinsic/tokens-css`** in app imports and `node_modules` layout.
