// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],

  app: {
    head: {
      templateParams: {
        separator: '·',
      },
    },
  },

  fonts: {
    families: [{ name: 'Artifika' }, { name: 'Archivo' }],
  },

  icon: {
    class: 'icon',
  },

  // for an application this small, sourcemap is not necessary
  sourcemap: false,

  // ogImage increases the size of the edge bundle
  ogImage: {
    enabled: false,
  },

  site: {
    url: 'https://distrohop.vercel.app',
    name: 'Distrohop',
    description:
      'Distrohop is a website that helps you find the best Linux distribution for your needs.',
    defaultLocale: 'en',
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    turso: {
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },

  vite: {
    esbuild: {
      legalComments: 'none',
    },
  },

  experimental: {
    sharedPrerenderData: true,
  },

  routeRules: {
    '/': { prerender: true },
    '/info/**': { prerender: true },
  },

  compatibilityDate: '2024-07-22',
})
