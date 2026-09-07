import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { dict, DEFAULT_LANG } from './i18n';
import { isKnownLang } from './langs';
import { LangContext } from './lang-context';
import { LangMenu } from './LangMenu';
import { sectionLinks, pageLinks } from './nav';

// Shared shell for every route. Mounted once (as the Router root) so the
// language choice and scroll state persist while pages swap underneath.
export default function Layout(props) {
  const location = useLocation();
  const [scrolled, setScrolled] = createSignal(false);
  const [lang, setLangState] = createSignal(DEFAULT_LANG);

  // active locale dictionary — reactive: reads the lang() signal
  const tr = () => dict(lang());

  // home = slide the topbar in on scroll; other routes = always show it.
  // Tolerate router builds that keep the base in pathname (e.g. /kaiatata/).
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const isHome = () => {
    const p = location.pathname.replace(/\/$/, '');
    return p === '' || p === base;
  };
  const showBar = () => scrolled() || !isHome();

  // persist the chosen language so it sticks across visits
  const setLang = (code) => {
    setLangState(code);
    try {
      localStorage.setItem('kt-lang', code);
      document.documentElement.lang = code;
    } catch (_) {}
  };

  onMount(() => {
    try {
      // precedence: ?lang= URL param, then saved preference, then default
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      const saved = localStorage.getItem('kt-lang');
      if (isKnownLang(fromUrl)) setLang(fromUrl);
      else if (isKnownLang(saved)) setLangState(saved);
      document.documentElement.lang = lang();
    } catch (_) {}

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    onCleanup(() => window.removeEventListener('scroll', onScroll));
  });

  return (
    <LangContext.Provider value={{ lang, setLang, tr }}>
      <div class="page">
        <header class={`topbar ${showBar() ? 'show' : ''}`}>
          <A class="topbar-brand" href="/" end>
            <span>Kaia &amp; Tata</span>
          </A>
          <div class="topbar-right">
            <nav class="topbar-nav">
              <For each={sectionLinks}>
                {(l) => <A href={l.href}>{tr().nav[l.key]}</A>}
              </For>
              <For each={pageLinks}>
                {(l) => (
                  <A href={l.href} end>
                    {tr().nav[l.key]}
                  </A>
                )}
              </For>
            </nav>
            <LangMenu variant="on-dark" />
          </div>
        </header>

        {props.children}

        <footer class="footer">
          <span>© {new Date().getFullYear()} {tr().footer}</span>
        </footer>
      </div>
    </LangContext.Provider>
  );
}
