import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import { LANGS } from './langs';
import { useLang } from './lang-context';
import { Flag } from './flags';

// Flag language switcher. Rendered in a couple of places (hero band + topbar);
// each instance keeps its own open state but shares the `lang` signal via
// context. Pass `variant="on-dark"` for the brown topbar.
export function LangMenu(props) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = createSignal(false);
  const current = () => LANGS.find((l) => l.code === lang()) ?? LANGS[0];
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
                  class={`lang-item ${l.code === lang() ? 'active' : ''}`}
                  onClick={() => {
                    setLang(l.code);
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
