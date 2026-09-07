// Site navigation. Section links are absolute (`/#id`) so they work from any
// route — from /about they navigate home first, then scroll (see Home.jsx's
// hash-scroll effect). `key` looks up the label in the active locale (nav.*).
export const sectionLinks = [
  { href: '/#adventure', key: 'adventure' },
  { href: '/#custom', key: 'custom' },
  { href: '/#puzzles', key: 'puzzles' },
  { href: '/#publishing', key: 'publishing' },
];

// Standalone routes (not in-page anchors).
export const pageLinks = [{ href: '/about', key: 'about' }];
