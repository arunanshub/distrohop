import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

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
