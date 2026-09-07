// Supported languages. English is the default. Each code needs a matching
// src/locales/<code>.json (registered in src/i18n.js) and an SVG in src/flags.jsx.
export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
];

export const isKnownLang = (code) => !!code && LANGS.some((l) => l.code === code);
