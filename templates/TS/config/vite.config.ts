import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { configDefaults, type UserConfig as VitestConfig } from 'vitest/config';

const config: UserConfig & { test: VitestConfig['test'] } = {
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
    // Add @testing-library/jest-dom matchers & setup MSW
    setupFiles: ['./setupTest.js', './src/mocks/setup.ts'],
    // Exclude files in c8
    coverage: {
      exclude: ['setupTest.js', 'src/mocks']
    },
    deps: {
      // Put Svelte component here, e.g., inline: [/svelte-multiselect/, /msw/]
      inline: [/msw/]
    },
    // Exclude playwright tests folder
    exclude: [...configDefaults.exclude, 'tests']
  }
};

export default config;
