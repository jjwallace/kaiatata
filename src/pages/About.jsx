import { For } from 'solid-js';
import { A } from '@solidjs/router';
import { useLang } from '../lang-context';

// Purpose / dedication page. Copy lives in each locale's `about` block.
export default function About() {
  const { tr } = useLang();
  const c = () => tr().about;

  return (
    <main id="top" class="about">
      <header class="about-hero">
        <p class="eyebrow">{c().eyebrow}</p>
        <h1>{c().title}</h1>
        <p class="about-lead">{c().intro}</p>
      </header>

      <section class="about-block">
        <p class="about-dedication">{c().mission.dedication}</p>
        <h2>{c().mission.title}</h2>
        <For each={c().mission.body}>{(para) => <p>{para}</p>}</For>
      </section>

      <section class="about-block">
        <h2>{c().giving.title}</h2>
        <p>{c().giving.body}</p>
      </section>

      <section class="about-cta">
        <h2>{c().cta.title}</h2>
        <p>{c().cta.body}</p>
        <A class="cta" href="/#join">{c().cta.button}</A>
      </section>

      <p class="about-benediction">{c().benediction}</p>
    </main>
  );
}
