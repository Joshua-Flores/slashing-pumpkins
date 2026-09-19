import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // Nuxt UI bundles the Tailwind Vite plugin, so it stands in for `@tailwindcss/vite`.
    ui({
      // The site is dark-only, so skip the VueUse color-mode integration that
      // would otherwise flip the `dark` class based on system preference.
      colorMode: false,
      icon: {
        // Bundle every `i-lucide-*` icon found in source. Without this only
        // Nuxt UI's own default icons ship, and the rest fall back to a
        // runtime Iconify API request that a static site shouldn't depend on.
        clientBundle: { scan: true },
      },
      ui: {
        colors: {
          primary: 'orange',
          neutral: 'zinc',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
})
