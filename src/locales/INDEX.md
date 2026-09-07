# Locales — translation reference

Per-locale JSON dictionaries for the site copy. Every file has the **same key
shape** (see `en.json`, the source of truth). Loaded by `../i18n.js` and read
reactively through `tr()` (from `useLang()`) in the pages, so switching the flag
re-renders all text across both routes.

## Files

| File | Language | Flag |
|---|---|---|
| `en.json` | English (default) | 🇬🇧 |
| `pl.json` | Polski (Polish) | 🇵🇱 |
| `de.json` | Deutsch (German) | 🇩🇪 |
| `fr.json` | Français (French) | 🇫🇷 |
| `es.json` | Español (Spanish) | 🇪🇸 |
| `it.json` | Italiano (Italian) | 🇮🇹 |

## Key shape

```jsonc
{
  "nav":     { "adventure", "custom", "puzzles", "publishing", "about" },  // nav labels
  "hero":    { "title", "subtitle", "cta" },
  "sections": {
    "adventure": { "tag", "title", "body", "cta", "alt" },        // "alt" = image alt text
    "custom":    { ... }, "puzzles": { ... }, "publishing": { ... }
  },
  "join":    { "title", "body", "placeholder", "button", "thanks" },
  "about": {                                                      // /about page
    "eyebrow", "title", "intro",
    "mission": { "title", "body" },
    "story":   { "title", "body": ["para", ...] },                // body is an array of paragraphs
    "valuesTitle",
    "values":  [ { "title", "body" }, ... ],                      // value cards
    "makers":  { "title", "body" },
    "cta":     { "title", "body", "button" }
  },
  "footer":  "..."                                                // brand line
}
```

Section keys (`adventure`, `custom`, `puzzles`, `publishing`) match the section
`id`s in `pages/Home.jsx`; nav keys match `nav.js`. The `about.*` block feeds
`pages/About.jsx` — currently **lorem ipsum placeholder** copy (real copy TBD);
the structural labels (titles, `eyebrow`, `button`) are translated per locale.

## Adding a language

1. Copy `en.json` → `<code>.json` and translate every value (keep the keys).
2. Register it in `../i18n.js` (`import` + add to `dictionaries`).
3. Add `{ code: '<code>', label: 'Native name' }` to `LANGS` in `../langs.js`.
4. Add an SVG flag for the code in `../flags.jsx`.
5. Verify with `…/?lang=<code>`.

## Rules

- Keep the **brand name** "Kaia & Tata Publishing" untranslated.
- Keep keys identical across files — a missing key falls back to English only at
  the whole-dictionary level, not per key.
- Plain UTF-8 JSON; emoji and accented characters are fine.
