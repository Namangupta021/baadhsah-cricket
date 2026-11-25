# Baadhsah Cricket (patched Expo web build)

- `mirror/` = deployed static site (compiled Expo web export, original source not available).
- `functions/api/backup.js` = Cloudflare Pages Function for cloud backup (KV binding `BACKUPS`, secret `CLOUD_PASSWORD`).
- Edits to screens are made in `.tools/patch/<module>.js` (prettified Metro modules 760 data-backups, 768 scorecard, 769 scoring),
  then applied with `.tools\node-v22.23.5-win-x64\node.exe .tools\apply-patch.js` (rebuilds from `.tools/patch/original-*.js`).

## Commands (PowerShell, from this folder)
```
$env:Path = "$PWD\.tools\node-v22.23.5-win-x64;$env:Path"
$env:NODE_OPTIONS = "--use-system-ca"      # corporate TLS proxy
$w = ".\.tools\node_modules\.bin\wrangler.cmd"   # use .cmd: ps1 scripts are blocked
& $w pages dev --port 8080 --ip 127.0.0.1  # local test (password in .dev.vars)
& $w pages deploy --branch main --commit-dirty=true
```

## Gotchas
- Wrangler never uploads folders named `node_modules`; Expo assets were moved from `mirror/assets/node_modules` to
  `mirror/assets/vendor` and references rewritten in entry/explore/worker JS. Keep it that way, or the site is blank
  (wa-sqlite.wasm missing).
- Secret name must be exactly `CLOUD_PASSWORD`; KV id in wrangler.toml must be the real 32-hex id.
- E2E: `.tools/e2e.js <steps.json>` drives headless Edge (puppeteer-core); screenshots in `.tools/shots`.
