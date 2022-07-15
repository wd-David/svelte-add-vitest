<p align="center">
    <img width="100" src="https://avatars.githubusercontent.com/u/23617963?s=200&v=4" alt="Logo of Svelte"/>
    <img width="100" src="https://user-images.githubusercontent.com/11247099/145112184-a9ff6727-661c-439d-9ada-963124a281f7.png" alt="Logo of Svelte"/>
  <br />
</p>

<h1 align="center">svelte-add-vitest</h1>
<pre><div align="center">npx @preset/cli davipon/svelte-add-vitest</div></pre>

## ❓ What is this?

This is a preset to add Vitest to your SvelteKit project.

## 🔋 Batteries-included
- [Use the APIs globally like Jest](https://vitest.dev/config/#globals)
- [In-source testing](https://vitest.dev/guide/in-source.html)
- [Native code coverage](https://vitest.dev/guide/coverage.html) via `c8`
- [Mock Service Worker](https://mswjs.io) (MSW) let you mock both REST and GraphQL network requests

## 🛠 Usage

You must start with a fresh copy of the official SvelteKit template, which is currently created by running this command:

```bash
npm create svelte my-app
```

> ⚠️ Make sure to choose **Skeleton Project**

Once that is set up, run this command in your project directory to set up Vitest:

```bash
npx @preset/cli davipon/svelte-add-vitest --ts --msw --example
```

### 🎭 Playwright compatible
If you have `playwright` installed, make sure to configure it to only run tests using playwright annotations.
For instance, the playwright test is placed under `tests` in SvelteKit skeleton project. You need to specify it after adding Vitest:

```js
//playwright.config.js

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173
  },
  // Add testMatch here
  testMatch: 'tests/**/*.js',
};

export default config;
```

### ⚙️ Options

| Description        | Flag        | Default |
| ------------------ | ----------- | ------- |
| Typescript Support | `--ts`      | False   |
| Setup `msw`        | `--msw`     | False   |
| Generate Example   | `--example` | False   |

## 📄 License

MIT