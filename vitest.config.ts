import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        browser: {
          enabled: true,
          provider: playwright(),
          // https://vitest.dev/guide/browser/playwright
          instances: [{ browser: 'chromium' }],
          headless: true,
        },
      },
    }),
  ),
)
