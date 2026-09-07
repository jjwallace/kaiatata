import { createSignal, createEffect, For } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { useLang } from '../lang-context';
import { LangMenu } from '../LangMenu';
import { sectionLinks } from '../nav';

// prefix with Vite's base URL so assets resolve under the /kaiatata/ subpath
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const LOGO = asset('assets/img/image_kaia_logo_stamp.png');
const TITLE = asset('assets/img/img_kaia_top_title_t.webp');
const PAPER = asset('assets/img/paper_tile.webp');

// Section order + images; all copy lives in src/locales, keyed by id.
// Ordered as requested: adventure → custom → puzzles → publishing
const sections = [
  { id: 'adventure', img: asset('assets/img/img_tile_kaia_adventure.webp') },
  { id: 'custom', img: asset('assets/img/img_tile_custom.webp') },
  { id: 'puzzles', img: asset('assets/img/img_puzzles_new.webp') },
  { id: 'publishing', img: asset('assets/img/publishing.webp') },
];

export default function Home() {
  const { tr } = useLang();
  const location = useLocation();
  const [submitted, setSubmitted] = createSignal(false);
  const [email, setEmail] = createSignal('');

  // scroll to a section when the URL carries a hash — covers both same-page
  // nav clicks and arriving from /about via a `/#id` link
  createEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email().trim()) setSubmitted(true);
  };

  return (
    <main id="top">
      <div class="logo-band" style={`background-image: url(${PAPER})`}>
        <div class="band-lang">
          <LangMenu />
        </div>
        <img class="title-banner" src={TITLE} alt="Kaia & Tata Publishing — Puzzles and Books Company" />
        <nav class="hero-pills">
          <For each={sectionLinks}>
            {(l) => <A href={l.href}>{tr().nav[l.key]}</A>}
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
  );
}
