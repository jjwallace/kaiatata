import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  // absolute base for the /kaiatata/ GitHub Pages subpath. Must be absolute
  // (not './') so @solidjs/router's history routing can derive a stable base
  // from import.meta.env.BASE_URL. Assets + router both key off this.
  base: '/kaiatata/',
  plugins: [solid()],
});
