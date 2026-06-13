# Publish @intrinsicvalue-llc/tokens-css

Generated CSS tokens ship as **`@intrinsicvalue-llc/tokens-css`** on [GitHub Packages](https://github.com/orgs/intrinsicvalue-llc/packages). Product repos install via npm alias as **`@intrinsic/tokens-css`** so CSS import paths stay stable.

## Release

1. Merge token changes to `main`; ensure `npm run build` / `scripts/check_design_tokens.sh` pass.
2. Bump `npm/tokens-css/package.json` version if not tagging (optional when using tags).
3. Tag the design repo (semver, aligned with package version):

   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

4. Workflow **Publish tokens-css** runs on `v*.*.*` tags and publishes to GitHub Packages.

Manual publish: **Actions → Publish tokens-css → Run workflow** (bump `npm/tokens-css/package.json` version first if the prior release already exists).

### If publish fails (org `intrinsicvalue-llc`)

1. **Org → Settings → Actions → General → Workflow permissions** → **Read and write permissions** (required for `GITHUB_TOKEN` to publish).
2. Do **not** rely on **`NPM_PUBLISH_TOKEN`** for this workflow — a bad PAT in that secret blocks publish. Publish uses **`GITHUB_TOKEN`** from the `design` repo (same repo as the package).
3. Manual dispatch: bump `npm/tokens-css/package.json` version first if the version already exists on the registry.
4. Re-run workflow or push a new tag `v*.*.*`.

First publish creates the package; product repos need **`NODE_AUTH_TOKEN`** with `read:packages` (Vercel env + local export).

## Consumer setup (product repos)

**`.npmrc`** (committed):

```ini
@intrinsicvalue-llc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**`package.json`**:

```json
"@intrinsic/tokens-css": "npm:@intrinsicvalue-llc/tokens-css@^1.0.0"
```

**Local dev:** export a GitHub PAT with `read:packages`:

```bash
export NODE_AUTH_TOKEN=ghp_...
npm ci
```

**GitHub Actions:** `setup-node` with `registry-url` + `GITHUB_TOKEN` (see `CONSUMPTION.md`).

**Vercel:** Project env **`NODE_AUTH_TOKEN`** — fine-grained PAT or classic token with `read:packages` for org `intrinsicvalue-llc`.

## Scope note

GitHub Packages requires the npm scope to match the org: **`@intrinsicvalue-llc/tokens-css`**. The alias preserves **`@intrinsic/tokens-css`** in app imports and `node_modules` layout.
