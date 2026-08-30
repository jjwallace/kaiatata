import { createSignal } from 'solid-js';

const LOGO = '/assets/img/image_kaia_logo_stamp.jpeg';

// Ordered as requested: adventure → custom → puzzles → publishing
const sections = [
  {
    id: 'adventure',
    tag: 'Coloring book series',
    title: 'The Kaia Adventure Series',
    body: 'Follow Kaia as she goes places — through mangrove swamps, past curious alligators and wading herons. Big, bold line art made for little hands and giant imaginations.',
    cta: 'Explore the series',
    img: '/assets/img/img_tile_kaia_adventure.png',
    alt: 'Kaia Goes Places — coloring book cover with a young explorer, an alligator and a heron',
  },
  {
    id: 'custom',
    tag: 'Made just for them',
    title: 'Custom Coloring Books',
    body: "Put your child at the center of the story. We craft personalized coloring books — riding elephants, roaming jungles, wherever their adventure leads.",
    cta: 'Start a custom book',
    img: '/assets/img/img_tile_custom.png',
    alt: 'Custom coloring book page of a child riding a decorated elephant',
  },
  {
    id: 'puzzles',
    tag: 'Play and learn',
    title: 'Puzzles for Kids',
    body: 'Trace the path, connect the dots, and solve your way through mazes and mini-games. Screen-free fun that builds focus, patience, and a love of solving.',
    cta: 'Browse the puzzles',
    img: '/assets/img/img_tile_puzzle.png',
    alt: 'Puzzles for kids — a maze to trace and a connect-the-dots activity',
  },
  {
    id: 'publishing',
    tag: 'For authors & creators',
    title: 'Publishing Opportunities',
    body: 'Have a story or activity book in you? Bring it to our press. We help authors and illustrators turn manuscripts into published books for kids everywhere.',
    cta: 'Publish with us',
    img: '/assets/img/17e054c5-e48c-41ed-8452-91ad3ccdf056.jpeg',
    alt: 'Publishing opportunities — a vintage printing press by a river',
  },
];

export default function App() {
  const [submitted, setSubmitted] = createSignal(false);
  const [email, setEmail] = createSignal('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email().trim()) setSubmitted(true);
  };

  return (
    <div class="page">
      <header class="nav">
        <a class="brand" href="#top">
          <img src={LOGO} alt="Kaia & Tata Publishing stamp" />
          <span>Kaia &amp; Tata</span>
        </a>
        <nav class="nav-links">
          <a href="#adventure">Adventure</a>
          <a href="#custom">Custom</a>
          <a href="#puzzles">Puzzles</a>
          <a href="#publishing">Publish</a>
        </nav>
      </header>

      <main id="top">
        <section class="hero">
          <img class="hero-stamp" src={LOGO} alt="Kaia & Tata Publishing — Puzzles and Books Company" />
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
      </main>

      <footer class="footer">
        <img src={LOGO} alt="" />
        <span>© {new Date().getFullYear()} Kaia &amp; Tata Publishing — Puzzles and Books Company</span>
      </footer>
    </div>
  );
}
