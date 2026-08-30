import { createSignal } from 'solid-js';

const features = [
  {
    title: 'Fast by default',
    body: 'Built on SolidJS and Vite for instant loads and buttery interactions.',
  },
  {
    title: 'Simple to extend',
    body: 'A clean, minimal foundation you can grow into anything.',
  },
  {
    title: 'Yours to own',
    body: 'No lock-in, no bloat — just the pieces you actually need.',
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
        <span class="logo">Kaiatata</span>
        <nav class="nav-links">
          <a href="#features">Features</a>
          <a href="#join">Join</a>
        </nav>
      </header>

      <main>
        <section class="hero">
          <p class="eyebrow">Coming soon</p>
          <h1>
            Build something
            <br />
            worth waiting for.
          </h1>
          <p class="subtitle">
            Kaiatata is a beautifully simple starting point. Fast, minimal, and
            entirely yours.
          </p>
          <a class="cta" href="#join">
            Get early access
          </a>
        </section>

        <section id="features" class="features">
          {features.map((f) => (
            <article class="card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </section>

        <section id="join" class="join">
          <h2>Be the first to know</h2>
          <p>Drop your email and we'll reach out when we launch.</p>
          {submitted() ? (
            <p class="thanks">Thanks — you're on the list. 🎉</p>
          ) : (
            <form class="signup" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
              <button type="submit">Notify me</button>
            </form>
          )}
        </section>
      </main>

      <footer class="footer">
        <span>© {new Date().getFullYear()} Kaiatata</span>
      </footer>
    </div>
  );
}
