// Lightweight i18n for the landing page.
//
// Each locale is a JSON file under ./locales with an identical key shape.
// `dict(lang)` returns the matching dictionary (falling back to English), and
// because it's called inside JSX from a reactive `lang()` signal, the whole
// page re-renders when the language changes.
//
// To add a language:
//   1. copy src/locales/en.json -> src/locales/<code>.json and translate it
//   2. import + register it in `dictionaries` below
//   3. add { code, flag, label } to LANGS in src/App.jsx
import en from './locales/en.json';
import pl from './locales/pl.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import it from './locales/it.json';

export const dictionaries = { en, pl, de, fr, es, it };

export const DEFAULT_LANG = 'en';

/** Dictionary for a locale, falling back to English if unknown. */
export const dict = (lang) => dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
