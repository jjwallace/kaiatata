# Kaia & Tata — Agent Guide

Marketing site for **Kaia & Tata Publishing — Puzzles and Books Company**
("kaiatata" = "Kaia & Tata"). A SolidJS site with a vintage coloring-book
aesthetic (sepia ink on cream paper). Two routes — a `/` landing page and an
`/about` purpose page. Deploys to GitHub Pages on **jjwallace**.

## Stack

- **SolidJS** + **@solidjs/router** (history routing) + **Vite** + **Bun**
- Google Fonts: Fredoka (display) + Caveat (script)
- Images pre-compressed to WebP; full-res sources kept in `originals/`
- Deploy: GitHub Actions → GitHub Pages (`base: '/kaiatata/'` for the subpath;
  build copies `index.html` → `404.html` for SPA deep-link fallback)

## Routing table — where things live

| Task / domain | Where |
|---|---|
| Router setup (routes, base) | `src/App.jsx` |
| Shared shell: topbar, footer, lang state | `src/Layout.jsx` (Router `root`) |
| Home page (hero, 4 sections, signup) | `src/pages/Home.jsx` |
| About / purpose page (mission, values) | `src/pages/About.jsx` |
| Theme, layout, responsive, topbar/pills, about page | `src/styles.css` |
| Language switcher (flag menu) | `src/LangMenu.jsx` |
| Language list + validation | `src/langs.js` (`LANGS`, `isKnownLang`) |
| Shared lang state (context) | `src/lang-context.js` (`useLang()` → `{lang,setLang,tr}`) |
| Nav link data (sections + pages) | `src/nav.js` |
| Translations / copy (per locale) | `src/locales/*.json` — see `src/locales/INDEX.md` |
| i18n lookup helper (`dict`, `DEFAULT_LANG`) | `src/i18n.js` |
| Inline SVG flags | `src/flags.jsx` |
| Images (shipped, optimized) | `public/assets/img/*.webp` (+ logo `.png`) |
| Full-resolution image originals | `originals/` (NOT deployed) |
| Fonts, meta, favicon, dark-mode locks | `index.html` |
| Base-path / build config | `vite.config.js` |
| CI deploy to Pages | `.github/workflows/deploy.yml` |

## Conventions

- **Two routes via history routing.** `/` (Home) and `/about` (About). Router
  `base` derives from `import.meta.env.BASE_URL`; `dist/404.html` (a build-time
  copy of `index.html`) boots the SPA on GH Pages deep links.
- **Section links are `/#id`** (see `src/nav.js`) so they work from any page —
  from `/about` they navigate home, then Home's hash-scroll effect scrolls.
- **All user-facing copy is translated** — never hardcode a string in a page.
  Add it to every `src/locales/<code>.json` and reference via `tr()` (from
  `useLang()`).
- **Brand name stays untranslated:** "Kaia & Tata Publishing".
- **Images:** compress new art to WebP (~2× display size), keep the original in
  `originals/`. Line art → WebP; detailed transparent PNGs may stay PNG if
  smaller. Reference paths through the `asset()` helper (respects the subpath).
- **No CSS `background-image: url()` to a public asset** — Vite can't rebase it
  under the subpath. Set it inline in JSX from an `asset()` value (see the
  paper-tile band in `Home.jsx`).
- **Dark mode:** the page is light-only by design (`color-scheme: light`,
  `darkreader-lock` meta). Don't add dark-theme styles that invert images.

## Common tasks

- **Edit copy:** change the key in `src/locales/en.json` and mirror it across the
  other locales.
- **Add a language:** copy `en.json` → `<code>.json`, translate, register in
  `src/i18n.js`, add `{ code, label }` to `LANGS` in `src/langs.js`, and add an
  SVG in `src/flags.jsx`.
- **Add a nav item:** a section → `src/nav.js` `sectionLinks` + a `nav.<key>` in
  every locale; a new page → add a `<Route>` in `src/App.jsx`, a page under
  `src/pages/`, and an entry in `pageLinks`.
- **Swap an image:** drop the source in `originals/`, compress to
  `public/assets/img/<name>.webp`, update the `asset(...)` path in `Home.jsx`.

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
