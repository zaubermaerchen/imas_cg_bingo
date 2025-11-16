import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode ?? 'development', process.cwd()) }

  return {
    base: process.env.VITE_APP_BASE_PATH,
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://zaubermaerchen.info',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/imas_cg/api/'),
          cookieDomainRewrite: '',
        },
        '/image': {
          target: 'https://zaubermaerchen.info',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/image/, '/imas_cg/image/'),
          cookieDomainRewrite: '',
        },
      },
    },
  }
})
