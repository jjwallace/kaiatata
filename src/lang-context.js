import { createContext, useContext } from 'solid-js';

// Shared language state. Provided once by <Layout> (which owns the `lang`
// signal so the choice survives route changes) and consumed by any page/
// component that needs the active locale.
//   value: { lang: () => code, setLang: (code) => void, tr: () => dictionary }
export const LangContext = createContext();

export const useLang = () => useContext(LangContext);
