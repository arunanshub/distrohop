import browserslistToEsbuild from 'browserslist-to-esbuild'
import {
  presetUno,
  presetWebFonts,
  presetTypography,
  transformerDirectives,
} from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // General
  srcDir: 'src/',
  app: {
    head: { titleTemplate: `%s · Distrohop` },
  },
  experimental: {
    headNext: true,
  },
  vue: { defineModel: true },

  // Modules
  modules: [
    // Image Handling and Optimization
    '@nuxt/image',
    // Performance Optimization
    '@nuxtjs/critters',
    'nuxt-delay-hydration',
    // State Management
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    // Content Management
    '@nuxt/content',
    // Utility Functions
    '@vueuse/nuxt',
    // Fonts and Typography
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@unocss/nuxt',
    // SEO and Crawling
    '@nuxtjs/robots',
    // Icons
    'nuxt-icon',
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

  // CSS and fonts
  postcss: {
    plugins: {
      'postcss-preset-env': true,
      cssnano: true,
    },
  },
  css: ['~/assets/css/main.css', '@unocss/reset/tailwind-compat.css'],
  unocss: {
    presets: [
      presetUno({ dark: 'media' }),
      presetTypography({
        cssExtend: {
          a: { 'text-decoration': 'none' },
          'a:hover': {
            'text-decoration': 'underline',
          },
          h1: {
            'margin-top': 0,
          },
        },
      }),
      presetWebFonts({
        provider: 'none',
        fonts: {
          artifika: 'Artifika',
          archivo: 'Archivo',
        },
      }),
    ],
    transformers: [
      // the default value of `post`/`default` interferes with Nuxt/CSSNano's minification
      transformerDirectives({ enforce: 'pre' }),
    ],
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
    '/**': { swr: true },
  },

  // Development
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },
  typescript: {
    strict: true,
    shim: false,
  },
})
