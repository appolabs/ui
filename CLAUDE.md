# CLAUDE.md

## Pre-commit Health Check

Always run these before committing. CI runs the same pipeline and will fail if any of these fail:

```bash
pnpm lint        # eslint — catches unused imports, type errors exposed as lint rules
pnpm typecheck   # tsc --noEmit — full type check
pnpm test        # vitest run
pnpm build       # tsup — confirms the dist output is valid
```

Run all at once:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Known CI Issues

- **Node 22.22.2 + npm**: Node 22.22.2 ships with a broken npm 10.9.7 (missing `promise-retry` internal dep). Release workflow is pinned to Node 20 to avoid this. Do not bump `node-version` in `.github/workflows/release.yml` to 22 until this is resolved upstream (tracked in nodejs/node#62425).

## Release

Releases are automated on push to `master`. The workflow in `.github/workflows/release.yml`:
1. Checks if the current `package.json` version is already tagged — if so, bumps patch automatically
2. Runs lint, typecheck, test, build
3. Publishes to npm with provenance via OIDC Trusted Publishing
4. Creates a GitHub release
