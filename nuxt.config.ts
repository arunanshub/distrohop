// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/image',
  ],

  experimental: {
    // sort head tags in the best order of performance
    headNext: true,
  },

  app: {
    head: {
      titleTemplate: '%s · Distrohop',
      htmlAttrs: { lang: 'en' },
    },
  },

  fonts: {
    families: [{ name: 'Artifika' }, { name: 'Archivo' }],
  },

  icon: {
    class: 'icon',
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    turso: {
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },
})
