# Kaia & Tata — Agent Guide

Landing page for **Kaia & Tata Publishing — Puzzles and Books Company**
("kaiatata" = "Kaia & Tata"). A single-page SolidJS site with a vintage
coloring-book aesthetic (sepia ink on cream paper). Deploys to GitHub Pages
on **jjwallace**.

## Stack

- **SolidJS** (signals, no router — one page) + **Vite** + **Bun**
- Google Fonts: Fredoka (display) + Caveat (script)
- Images pre-compressed to WebP; full-res sources kept in `originals/`
- Deploy: GitHub Actions → GitHub Pages (`base: './'` for the `/kaiatata/` subpath)

## Routing table — where things live

| Task / domain | Where |
|---|---|
| Page structure, all sections, hero, signup | `src/App.jsx` (single component) |
| Theme, layout, responsive, topbar/pills | `src/styles.css` |
| Language switcher (flag menu) | `LangMenu` in `src/App.jsx` + `LANGS` list |
| Translations / copy (per locale) | `src/locales/*.json` — see `src/locales/INDEX.md` |
| i18n lookup helper (`dict`, `DEFAULT_LANG`) | `src/i18n.js` |
| Images (shipped, optimized) | `public/assets/img/*.webp` (+ logo `.png`) |
| Full-resolution image originals | `originals/` (NOT deployed) |
| Fonts, meta, favicon, dark-mode locks | `index.html` |
| Base-path / build config | `vite.config.js` |
| CI deploy to Pages | `.github/workflows/deploy.yml` |

## Conventions

- **Single page.** No router; nav links are in-page anchors (`#adventure`, etc.).
- **All user-facing copy is translated** — never hardcode a string in `App.jsx`.
  Add it to every `src/locales/<code>.json` and reference via `tr()`.
- **Brand name stays untranslated:** "Kaia & Tata Publishing".
- **Images:** compress new art to WebP (~2× display size), keep the original in
  `originals/`. Line art → WebP; detailed transparent PNGs may stay PNG if
  smaller. Reference paths through the `asset()` helper (respects the subpath).
- **No CSS `background-image: url()` to a public asset** — Vite can't rebase it
  under the subpath. Set it inline in JSX from an `asset()` value (see the
  paper-tile band).
- **Dark mode:** the page is light-only by design (`color-scheme: light`,
  `darkreader-lock` meta). Don't add dark-theme styles that invert images.

## Common tasks

- **Edit copy:** change the key in `src/locales/en.json` and mirror it across the
  other locales.
- **Add a language:** copy `en.json` → `<code>.json`, translate, register in
  `src/i18n.js`, add `{ code, flag, label }` to `LANGS` in `src/App.jsx`.
- **Swap an image:** drop the source in `originals/`, compress to
  `public/assets/img/<name>.webp`, update the `asset(...)` path in `sections`.

## Develop

```bash
bun install
bun run dev      # dev server (http://localhost:5173)
bun run build    # production build -> dist/
bun run preview  # preview the production build
```

Test a language directly with the URL param, e.g. `…/?lang=pl` (precedence:
URL param → saved preference → English default).

## Deploy

Push to `main` → the `deploy.yml` workflow builds and publishes to
**https://jjwallace.github.io/kaiatata/**. Pushing the workflow file requires the
gh token to have the `workflow` scope.
