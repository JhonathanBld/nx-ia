import { loadManifest } from '@angular-architects/module-federation';

loadManifest('/assets/mf.manifest.json')
  .catch((err) => console.error('Error loading manifest:', err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
