import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { configDefaults } from 'vitest/config';

const config: UserConfig = {
  plugins: [sveltekit()],
  define: {
    // Eliminate in-source test code
    'import.meta.vitest': 'undefined'
  },
  test: {
    // jest like globals
    globals: true,
    environment: 'jsdom',
    // in-source testing
    includeSource: ['src/**/*.{js,ts,svelte}'],
    // Exclude playwright tests folder
    exclude: [...configDefaults.exclude, 'tests']
  }
};

export default config;
