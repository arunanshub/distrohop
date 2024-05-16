import tailwindTypography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  plugins: [tailwindTypography],
  theme: {
    extend: {
      fontFamily: {
        artifika: ['Artifika'],
        archivo: ['Archivo'],
      },
    },
  },
  content: [],
} satisfies Config
