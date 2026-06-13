# Deploy docs site → design.intrinsicvalue.llc

## Vercel (one-time)

1. [vercel.com/new](https://vercel.com/new) → Import **`intrinsicvalue-llc/design`**
2. **Root Directory:** `docs-site`
3. **Project name:** `design` or `intrinsic-design-docs`
4. Deploy

## Custom domain

1. Vercel project → **Settings → Domains**
2. Add **`design.intrinsicvalue.llc`**
3. In Namecheap (or DNS): add the CNAME/A records Vercel shows
4. Wait for SSL (usually minutes)

## Local dev

```bash
cd docs-site
npm install
npm run dev
```

Open http://localhost:3002

## CI

Design repo CI builds docs-site on every push to `main`.
