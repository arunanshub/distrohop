import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography({ cssExtend: { a: { 'text-decoration': 'none' } } }),
  ],
  transformers: [
    // the default value of `post`/`default` interferes with Nuxt/CSSNano's minification
    transformerDirectives({ enforce: 'pre' }),
  ],
})
