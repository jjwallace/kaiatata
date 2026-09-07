import { Switch, Match, createUniqueId } from 'solid-js';

// Inline SVG flags. Unlike emoji flags (🇵🇱 …) these render identically on every
// OS — Windows in particular has no flag-emoji glyphs. Each flag uses its own
// natural aspect ratio and is sized by CSS height (see `.flag-svg`).

function PL() {
  return (
    <svg class="flag-svg" viewBox="0 0 16 10" aria-hidden="true">
      <rect width="16" height="10" fill="#fff" />
      <rect width="16" height="5" y="5" fill="#d4213d" />
    </svg>
  );
}

function DE() {
  return (
    <svg class="flag-svg" viewBox="0 0 5 3" aria-hidden="true">
      <rect width="5" height="3" fill="#ffce00" />
      <rect width="5" height="2" fill="#dd0000" />
      <rect width="5" height="1" fill="#000" />
    </svg>
  );
}

function FR() {
  return (
    <svg class="flag-svg" viewBox="0 0 3 2" aria-hidden="true">
      <rect width="3" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#0055a4" />
      <rect width="1" height="2" x="2" fill="#ef4135" />
    </svg>
  );
}

function IT() {
  return (
    <svg class="flag-svg" viewBox="0 0 3 2" aria-hidden="true">
      <rect width="3" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#009246" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

function ES() {
  return (
    <svg class="flag-svg" viewBox="0 0 6 4" aria-hidden="true">
      <rect width="6" height="4" fill="#aa151b" />
      <rect width="6" height="2" y="1" fill="#f1bf00" />
    </svg>
  );
}

// English → Union Jack. Unique clip-path ids per instance so multiple GB flags
// (button + menu) don't collide.
function GB() {
  const a = createUniqueId();
  const b = createUniqueId();
  return (
    <svg class="flag-svg" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id={a}>
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id={b}>
        <path d="M30 15h30v15zv15H30zH0v-15zV0h30z" />
      </clipPath>
      <g clip-path={`url(#${a})`}>
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6" />
        <path
          d="M0 0 60 30M60 0 0 30"
          clip-path={`url(#${b})`}
          stroke="#c8102e"
          stroke-width="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6" />
      </g>
    </svg>
  );
}

export function Flag(props) {
  return (
    <Switch fallback={<GB />}>
      <Match when={props.code === 'pl'}>
        <PL />
      </Match>
      <Match when={props.code === 'de'}>
        <DE />
      </Match>
      <Match when={props.code === 'fr'}>
        <FR />
      </Match>
      <Match when={props.code === 'es'}>
        <ES />
      </Match>
      <Match when={props.code === 'it'}>
        <IT />
      </Match>
      <Match when={props.code === 'en'}>
        <GB />
      </Match>
    </Switch>
  );
}
