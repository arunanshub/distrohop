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

  sourcemap: false,

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
})
