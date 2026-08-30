import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  // relative base so it works under the /kaiatata/ GitHub Pages subpath
  base: './',
  plugins: [solid()],
});
