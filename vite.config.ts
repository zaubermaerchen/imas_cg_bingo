import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/image': {
        target: 'https://zaubermaerchen.info/imas_cg/image',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image/, ''),
        cookieDomainRewrite: '',
      },
    },
  },
})
