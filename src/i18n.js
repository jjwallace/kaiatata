// Lightweight i18n for the landing page.
//
// Each locale is a JSON file under ./locales with an identical key shape.
// `dict(lang)` returns the matching dictionary (falling back to English), and
// because it's called inside JSX from a reactive `lang()` signal, the whole
// page re-renders when the language changes.
//
// Any key missing from a locale falls back to English per-key (deep merge), so a
// partial translation degrades gracefully instead of throwing — handy while the
// English copy is still being curated ahead of the other locales.
//
// To add a language:
//   1. copy src/locales/en.json -> src/locales/<code>.json and translate it
//   2. import + register it in `dictionaries` below
//   3. add { code, label } to LANGS in src/langs.js and an SVG in src/flags.jsx
import en from './locales/en.json';
import pl from './locales/pl.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import it from './locales/it.json';

export const dictionaries = { en, pl, de, fr, es, it };

export const DEFAULT_LANG = 'en';

// Deep-merge `over` onto `base`; arrays and primitives replace wholesale, plain
// objects merge key-by-key. Used to backfill a locale from English.
function deepMerge(base, over) {
  if (over === undefined) return base;
  if (Array.isArray(over) || typeof over !== 'object' || over === null) return over;
  if (typeof base !== 'object' || base === null || Array.isArray(base)) return over;
  const out = { ...base };
  for (const k of Object.keys(over)) out[k] = deepMerge(base[k], over[k]);
  return out;
}

const merged = {};

/** Dictionary for a locale, backfilled from English for any missing keys. */
export const dict = (lang) => {
  const key = dictionaries[lang] ? lang : DEFAULT_LANG;
  if (!merged[key]) {
    merged[key] =
      key === DEFAULT_LANG ? dictionaries[DEFAULT_LANG] : deepMerge(dictionaries[DEFAULT_LANG], dictionaries[key]);
  }
  return merged[key];
};
