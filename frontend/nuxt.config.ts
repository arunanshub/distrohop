import browserslistToEsbuild from 'browserslist-to-esbuild'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // General
  srcDir: 'src/',
  app: {
    head: { titleTemplate: `%s · Distrohop` },
  },

  // Modules
  modules: [
    '@nuxt/image',
    '@unocss/nuxt',
    'nuxt-delay-hydration',
    '@nuxtjs/critters',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],

  // Module Options
  content: {
    highlight: { theme: 'github-light' },
  },
  pinia: {
    autoImports: ['defineStore'],
  },
  delayHydration: {
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount',
  },

  // CSS
  css: ['@unocss/reset/tailwind-compat.css'],
  postcss: {
    plugins: {
      'postcss-preset-env': true,
      cssnano: true,
    },
  },

  // Build
  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
    minify: true,
  },
  vite: {
    esbuild: {
      legalComments: 'none',
      target: browserslistToEsbuild(),
    },
  },

  // Development
  devtools: {
    enabled: true,
    timeline: { enabled: true, },
  },
  typescript: {
    strict: true,
    shim: false
  },
})
