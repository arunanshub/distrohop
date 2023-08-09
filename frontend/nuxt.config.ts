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
    '@nuxtjs/fontaine',
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
  unocss: {
    presets: [
      presetUno({ dark: 'media' }),
      presetTypography({ cssExtend: { a: { 'text-decoration': 'none' } } }),
      presetWebFonts({
        provider: 'bunny',
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
    timeline: { enabled: true },
  },
  typescript: {
    strict: true,
    shim: false,
  },
})
