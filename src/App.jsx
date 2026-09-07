import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import { dict, DEFAULT_LANG } from './i18n';
import { Flag } from './flags';

// prefix with Vite's base URL so assets resolve under the /kaiatata/ subpath
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const LOGO = asset('assets/img/image_kaia_logo_stamp.png');
const TITLE = asset('assets/img/img_kaia_top_title_t.webp');
const PAPER = asset('assets/img/paper_tile.webp');

// href + the key used to look up the label in the active locale (see src/locales)
const navLinks = [
  { href: '#adventure', key: 'adventure' },
  { href: '#custom', key: 'custom' },
  { href: '#puzzles', key: 'puzzles' },
  { href: '#publishing', key: 'publishing' },
];

// English is the default. Each code must have a matching src/locales/<code>.json
// registered in src/i18n.js, plus an SVG in src/flags.jsx.
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
];

// Flag language switcher. Rendered twice (hero + topbar); each instance keeps
// its own open state but shares the `lang` signal passed in via props.
function LangMenu(props) {
  const [open, setOpen] = createSignal(false);
  const current = () => LANGS.find((l) => l.code === props.lang()) ?? LANGS[0];
  let root;

  onMount(() => {
    const onDoc = (e) => {
      if (root && !root.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    onCleanup(() => document.removeEventListener('click', onDoc));
  });

  return (
    <div class={`lang ${props.variant ?? ''}`} ref={root}>
      <button
        class="lang-btn"
        type="button"
        aria-label="Select language"
        aria-expanded={open()}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open());
        }}
      >
        <span class="lang-flag"><Flag code={current().code} /></span>
        <span class="lang-code">{current().code.toUpperCase()}</span>
        <span class="lang-caret" aria-hidden="true">▾</span>
      </button>
      <Show when={open()}>
        <ul class="lang-menu">
          <For each={LANGS}>
            {(l) => (
              <li>
                <button
                  type="button"
                  class={`lang-item ${l.code === props.lang() ? 'active' : ''}`}
                  onClick={() => {
                    props.setLang(l.code);
                    setOpen(false);
                  }}
                >
                  <span class="lang-flag"><Flag code={l.code} /></span>
                  <span>{l.label}</span>
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

// Section order + images; all copy lives in src/locales, keyed by id.
// Ordered as requested: adventure → custom → puzzles → publishing
const sections = [
  { id: 'adventure', img: asset('assets/img/img_tile_kaia_adventure.webp') },
  { id: 'custom', img: asset('assets/img/img_tile_custom.webp') },
  { id: 'puzzles', img: asset('assets/img/img_puzzles_new.webp') },
  { id: 'publishing', img: asset('assets/img/publishing.webp') },
];

export default function App() {
  const [submitted, setSubmitted] = createSignal(false);
  const [email, setEmail] = createSignal('');
  const [scrolled, setScrolled] = createSignal(false);
  const [lang, setLangState] = createSignal(DEFAULT_LANG);

  // active locale dictionary — reactive: reads the lang() signal
  const tr = () => dict(lang());

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
      const known = (c) => c && LANGS.some((l) => l.code === c);
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      const saved = localStorage.getItem('kt-lang');
      if (known(fromUrl)) setLang(fromUrl);
      else if (known(saved)) setLangState(saved);
      document.documentElement.lang = lang();
    } catch (_) {}

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    onCleanup(() => window.removeEventListener('scroll', onScroll));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email().trim()) setSubmitted(true);
  };

  return (
    <div class="page">
      {/* thin brown bar — hidden until the user starts scrolling */}
      <header class={`topbar ${scrolled() ? 'show' : ''}`}>
        <a class="topbar-brand" href="#top">
          <span>Kaia &amp; Tata</span>
        </a>
        <div class="topbar-right">
          <nav class="topbar-nav">
            <For each={navLinks}>
              {(l) => <a href={l.href}>{tr().nav[l.key]}</a>}
            </For>
          </nav>
          <LangMenu variant="on-dark" lang={lang} setLang={setLang} />
        </div>
      </header>

      <main id="top">
        <div class="logo-band" style={`background-image: url(${PAPER})`}>
          <div class="band-lang">
            <LangMenu lang={lang} setLang={setLang} />
          </div>
          <img class="title-banner" src={TITLE} alt="Kaia & Tata Publishing — Puzzles and Books Company" />
          <nav class="hero-pills">
            <For each={navLinks}>
              {(l) => <a href={l.href}>{tr().nav[l.key]}</a>}
            </For>
          </nav>
        </div>
        <section class="hero">
          <h1>{tr().hero.title}</h1>
          <p class="subtitle">{tr().hero.subtitle}</p>
          <a class="cta" href="#adventure">{tr().hero.cta}</a>
        </section>

        {sections.map((s, i) => {
          const c = () => tr().sections[s.id];
          return (
            <section id={s.id} class={`showcase ${i % 2 ? 'reverse' : ''}`}>
              <div class="showcase-art">
                <img src={s.img} alt={c().alt} loading="lazy" />
              </div>
              <div class="showcase-copy">
                <p class="eyebrow">{c().tag}</p>
                <h2>{c().title}</h2>
                <p>{c().body}</p>
                <a class="link-cta" href="#join">
                  {c().cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
          );
        })}

        <section id="join" class="join">
          <h2>{tr().join.title}</h2>
          <p>{tr().join.body}</p>
          {submitted() ? (
            <p class="thanks">{tr().join.thanks}</p>
          ) : (
            <form class="signup" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder={tr().join.placeholder}
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
              <button type="submit">{tr().join.button}</button>
            </form>
          )}
        </section>

        <div class="bottom-stamp">
          <img src={LOGO} alt="Kaia & Tata Publishing — Puzzles and Books Company stamp" />
        </div>
      </main>

      <footer class="footer">
        <span>© {new Date().getFullYear()} {tr().footer}</span>
      </footer>
    </div>
  );
}
