# Kaia & Tata Publishing

Landing page for **Kaia & Tata Publishing — Puzzles and Books Company**.
A simple SolidJS site with a vintage coloring-book look (sepia ink on cream paper).

Sections, in order:

1. **The Kaia Adventure Series** — "Kaia Goes Places" coloring books
2. **Custom Coloring Books** — personalized books
3. **Puzzles for Kids** — mazes, connect-the-dots, activities
4. **Publishing Opportunities** — for authors & illustrators

## Develop

```bash
bun install
bun run dev      # start dev server
bun run build    # production build → dist/
bun run preview  # preview the production build
```

## Languages

The site ships in **English (default), Polish, German, French, Spanish, and
Italian**, chosen via the flag menu (top-right / topbar). Copy lives in
per-locale JSON under `src/locales/` — see `src/locales/INDEX.md`. Test one
directly with `?lang=pl` (etc.); the choice persists in `localStorage`.

## Stack

- [SolidJS](https://www.solidjs.com/) — reactive UI
- [Vite](https://vitejs.dev/) — dev server & bundler

## Structure

```
index.html                 entry HTML + fonts
src/index.jsx              app mount
src/App.jsx                landing page (hero + 4 showcase sections + signup + lang switcher)
src/i18n.js                locale loader (dict, DEFAULT_LANG)
src/locales/*.json         translations (en, pl, de, fr, es, it) + INDEX.md
src/styles.css             coloring-book theme
public/assets/img/         optimized WebP art (+ PNG logo)
originals/                 full-res image sources (not deployed)
```

See `AGENTS.md` for the full agent/contributor guide and routing table.
