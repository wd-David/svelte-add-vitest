export default definePreset({
  name: 'svelte-add-vitest',
  options: {
    msw: false,
    ts: false,
    example: false
  },
  handler: async (context) => {
    await installPackages({
      title: 'Installing packages',
      for: 'node',
      packages: [
        'vitest',
        '@testing-library/svelte',
        '@testing-library/jest-dom',
        '@types/testing-library__jest-dom',
        'jsdom',
        'c8',
        context.options.msw ? 'msw' : ''
      ],
      dev: true
    })
    await extractTemplates({
      title: 'Extract vite.config.js to the root folder',
      from: 'config'
    })
    await editFiles({
      title: 'Add "test" & "coverage" to package.json scripts',
      files: 'package.json',
      operations: {
        type: 'edit-json',
        merge: {
          scripts: {
            'test:unit': 'vitest',
            coverage: 'vitest run --coverage'
          }
        }
      }
    })
    if (context.options.ts) {
      await editFiles({
        title: 'Add "vitest/globals" & "vitest/importMeta" & @testing-library/jest-dom to tsconfig.json',
        files: 'tsconfig.json',
        operations: {
          type: 'edit-json',
          merge: {
            compilerOptions: {
              types: [
                'vitest/globals',
                'vitest/importMeta',
                '@testing-library/jest-dom'
              ]
            }
          }
        }
      })
    } else {
      await editFiles({
        title: 'Add "vitest/importMeta" & @testing-library/jest-dom to jsconfig.json',
        files: 'jsconfig.json',
        operations: {
          type: 'edit-json',
          merge: {
            compilerOptions: {
              types: ['vitest/importMeta', '@testing-library/jest-dom']
            }
          }
        }
      })
    }
    await editFiles({
      title: 'Modify vite.config.js',
      files: 'vite.config.js',
      operations: [
        {
          type: 'update-content',
          update: (content) =>
            content.replace(
              `includeSource: ['src/**/*.{js,ts,svelte}']`,
              `includeSource: ['src/**/*.{js,ts,svelte}'],${
                context.options.msw
                  ? `
    // msw setup
    setupFiles: ['./setupVitest.js', './src/mocks/setup.${
      context.options.ts ? 'ts' : 'js'
    }'],
    coverage: {
      exclude: ['src/mocks']
    },`
                  : `
    setupFiles: ['./setupVitest.js'],`
              }
    deps: {
      // Put Svelte component here, e.g., inline: [/svelte-multiselect/, /msw/]
      inline: [${context.options.msw ? '/msw/' : ''}]
    }`
            )
        }
      ]
    })
    await editFiles({
      title: 'Add "coverage" to .gitignore',
      files: '.gitignore',
      operations: [{ type: 'add-line', position: 'prepend', lines: 'coverage' }]
    })
    if (context.options.example) {
      await extractTemplates({
        title: 'Extract example test',
        from: `${context.options.ts ? 'TS' : 'JS'}/test`,
        to: 'src/routes'
      })
      if (context.options.msw) {
        await installPackages({
          title: 'Installing cross-fetch',
          for: 'node',
          packages: ['cross-fetch'],
          dev: true
        })
        await extractTemplates({
          title: 'Extract example in-source + msw test',
          from: `${context.options.ts ? 'TS' : 'JS'}/msw`,
          to: 'src/routes'
        })
      }
    }
    if (context.options.msw) {
      await executeCommand({
        title: 'Create mocks folder',
        command: 'mkdir',
        arguments: ['src/mocks']
      })
      await extractTemplates({
        title: 'Extract mocks',
        from: `${context.options.ts ? 'TS' : 'JS'}/mocks`,
        to: 'src/mocks'
      })
    }
  }
})
