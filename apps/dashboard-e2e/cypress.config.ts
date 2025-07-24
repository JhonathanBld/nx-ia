import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js';
import { defineConfig } from 'cypress';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run dashboard:serve',
        production: 'npx nx run dashboard:serve-static',
      },
      ciWebServerCommand: 'npx nx run dashboard:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
