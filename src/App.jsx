import { Router, Route } from '@solidjs/router';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';

// History routing under the /kaiatata/ subpath. `base` (minus the trailing
// slash) comes from vite's base so dev, preview and GitHub Pages all agree.
// Deep links (e.g. /kaiatata/about) rely on dist/404.html — a copy of
// index.html made in the build script — to boot the SPA on GH Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <Router base={base} root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}
