# Feti — deploy folder

Drop **all** of these files into your GitHub Pages repo (repo root, or a `/docs` folder if you set Pages to serve from `/docs`).

## Files
- `index.html` — entry point (redirects to the app)
- `Feti.dc.html` — the app
- `support.js` — runtime
- `manifest.json` — PWA manifest
- `sw.js` — service worker (offline + install)
- `.nojekyll` — tells GitHub Pages to serve every file untouched
- `assets/feti/*` — mascot poses
- `assets/icons/*` — app icons

## Steps
1. Create a GitHub repo (e.g. `feti`) and upload the **contents** of this folder to the repo root.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. Wait ~1 minute, then open the URL it shows (e.g. `https://YOURNAME.github.io/feti/`) in **Safari on your iPhone**.
4. Tap **Share → Add to Home Screen → Add**.
5. Launch from the Feti icon — full-screen, offline-capable.

Note: it must be opened in **Safari** (not Chrome) for "Add to Home Screen" to install as a PWA. Use the `https://` URL, never a local file.
