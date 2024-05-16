import browserslistToEsbuild from 'browserslist-to-esbuild'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s · Distrohop',
      // manually add lang until we use nuxt-i18n
      htmlAttrs: { lang: 'en' },
    },
  },
  experimental: {
    asyncContext: true,
    headNext: true,
    componentIslands: true,
  },

  // Modules
  modules: [
    // Image Handling and Optimization
    '@nuxt/image',
    // Performance Optimization
    '@nuxtjs/critters',
    'nuxt-delay-hydration',
    // Content Management
    '@nuxt/content',
    // Utility Functions
    '@vueuse/nuxt',
    // Fonts and Typography
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    // SEO and Crawling
    '@nuxtjs/robots',
    // Icons
    'nuxt-icon',
    'nuxt-build-cache',
  ],

  // Module Options
  content: {
    highlight: { theme: 'github-light' },
  },
  delayHydration: {
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount',
    exclude: ['/quiz/**'],
  },

  // CSS and fonts
  postcss: {
    plugins: {
      'postcss-preset-env': true,
      cssnano: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    },
  },
  // NOTE: the actual tailwindcss config file is in the root of the project
  tailwindcss: {
    // exposeConfig lets us use tailwind completion in vscode
    exposeConfig: true,
  },
  googleFonts: {
    download: true,
    families: {
      Artifika: true,
      Archivo: true,
    },
  },

  // Build
  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
    minify: true,
    future: { nativeSWR: true },
  },
  vite: {
    esbuild: {
      legalComments: 'none',
      target: browserslistToEsbuild(),
    },
  },
  routeRules: {
    '/': { isr: true },
    '/quiz/**': { isr: true },
    '/info/**': { static: true },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    turso: {
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },

  // Development
  devtools: { enabled: true },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: ['@types/node'],
      },
    },
  },
})
