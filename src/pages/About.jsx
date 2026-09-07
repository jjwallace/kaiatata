import { For } from 'solid-js';
import { A } from '@solidjs/router';
import { useLang } from '../lang-context';

// Purpose / mission page. Copy lives in each locale's `about` block
// (placeholder lorem ipsum for now — real copy to come).
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
        <h2>{c().mission.title}</h2>
        <p>{c().mission.body}</p>
      </section>

      <section class="about-block">
        <h2>{c().story.title}</h2>
        <For each={c().story.body}>{(para) => <p>{para}</p>}</For>
      </section>

      <section class="about-values">
        <h2>{c().valuesTitle}</h2>
        <div class="value-grid">
          <For each={c().values}>
            {(v) => (
              <div class="value-card">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class="about-block">
        <h2>{c().makers.title}</h2>
        <p>{c().makers.body}</p>
      </section>

      <section class="about-cta">
        <h2>{c().cta.title}</h2>
        <p>{c().cta.body}</p>
        <A class="cta" href="/#join">{c().cta.button}</A>
      </section>
    </main>
  );
}
