import { createSignal, onMount, onCleanup, For } from 'solid-js';

// prefix with Vite's base URL so assets resolve under the /kaiatata/ subpath
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const LOGO = asset('assets/img/image_kaia_logo_stamp.png');
const TITLE = asset('assets/img/img_kaia_top_title_t.webp');
const PAPER = asset('assets/img/paper_tile.webp');

const navLinks = [
  { href: '#adventure', label: 'Adventure' },
  { href: '#custom', label: 'Custom' },
  { href: '#puzzles', label: 'Puzzles' },
  { href: '#publishing', label: 'Publish' },
];

// Ordered as requested: adventure → custom → puzzles → publishing
const sections = [
  {
    id: 'adventure',
    tag: 'Coloring book series',
    title: 'The Kaia Adventure Series',
    body: 'Follow Kaia as she goes places — through mangrove swamps, past curious alligators and wading herons. Big, bold line art made for little hands and giant imaginations.',
    cta: 'Explore the series',
    img: asset('assets/img/img_tile_kaia_adventure.webp'),
    alt: 'Kaia Goes Places — coloring book cover with a young explorer, an alligator and a heron',
  },
  {
    id: 'custom',
    tag: 'Made just for them',
    title: 'Custom Coloring Books',
    body: "Put your child at the center of the story. We craft personalized coloring books — riding elephants, roaming jungles, wherever their adventure leads.",
    cta: 'Start a custom book',
    img: asset('assets/img/img_tile_custom.webp'),
    alt: 'Custom coloring book page of a child riding a decorated elephant',
  },
  {
    id: 'puzzles',
    tag: 'Play and learn',
    title: 'Puzzles for Kids',
    body: 'Find the differences, trace the path, connect the dots, hunt for words, and colour by number. Screen-free fun that builds focus, patience, and a love of solving.',
    cta: 'Browse the puzzles',
    img: asset('assets/img/img_puzzles_new.webp'),
    alt: 'Puzzles for kids — find the differences, trace the path, connect the dots, word search and colour by number',
  },
  {
    id: 'publishing',
    tag: 'For authors & creators',
    title: 'Publishing Opportunities',
    body: 'Have a story or activity book in you? Bring it to our press. We help authors and illustrators turn manuscripts into published books for kids everywhere.',
    cta: 'Publish with us',
    img: asset('assets/img/publishing.webp'),
    alt: 'Publishing opportunities — a vintage printing press by a river',
  },
];

export default function App() {
  const [submitted, setSubmitted] = createSignal(false);
  const [email, setEmail] = createSignal('');
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
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
        <nav class="topbar-nav">
          <For each={navLinks}>
            {(l) => <a href={l.href}>{l.label}</a>}
          </For>
        </nav>
      </header>

      <main id="top">
        <div class="logo-band" style={`background-image: url(${PAPER})`}>
          <img class="title-banner" src={TITLE} alt="Kaia & Tata Publishing — Puzzles and Books Company" />
          <nav class="hero-pills">
            <For each={navLinks}>
              {(l) => <a href={l.href}>{l.label}</a>}
            </For>
          </nav>
        </div>
        <section class="hero">
          <h1>Puzzles &amp; books that take kids places.</h1>
          <p class="subtitle">
            Kaia &amp; Tata Publishing makes coloring books, custom stories, and
            playful puzzles for young explorers — and helps new authors get
            published.
          </p>
          <a class="cta" href="#adventure">Discover our books</a>
        </section>

        {sections.map((s, i) => (
          <section id={s.id} class={`showcase ${i % 2 ? 'reverse' : ''}`}>
            <div class="showcase-art">
              <img src={s.img} alt={s.alt} loading="lazy" />
            </div>
            <div class="showcase-copy">
              <p class="eyebrow">{s.tag}</p>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              <a class="link-cta" href="#join">
                {s.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        ))}

        <section id="join" class="join">
          <h2>Join the adventure</h2>
          <p>New books, puzzles, and publishing news — straight to your inbox.</p>
          {submitted() ? (
            <p class="thanks">Thanks — welcome aboard, explorer! 🧭</p>
          ) : (
            <form class="signup" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
              <button type="submit">Keep me posted</button>
            </form>
          )}
        </section>

        <div class="bottom-stamp">
          <img src={LOGO} alt="Kaia & Tata Publishing — Puzzles and Books Company stamp" />
        </div>
      </main>

      <footer class="footer">
        <span>© {new Date().getFullYear()} Kaia &amp; Tata Publishing — Puzzles and Books Company</span>
      </footer>
    </div>
  );
}
