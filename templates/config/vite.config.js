import { sveltekit } from '@sveltejs/kit/experimental/vite'

/** @type {import('vitest/config').UserConfig} */
export default {
  define: {
    // Eliminate in-source test code
    'import.meta.vitest': 'undefined'
  },
  test: {
    // jest like globals
    globals: true,
    environment: 'jsdom',
    // in-source testing
    includeSource: ['src/**/*.{js,ts,svelte}']
  },
  plugins: [sveltekit()]
}
