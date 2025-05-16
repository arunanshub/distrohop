import { type KnipConfig } from "knip"

export default {
  ignore: [
    "src/components/ui/**",
    "eslint.config.mjs",
    "src/lib/posthog.ts",
    "setupFiles.ts",
    "scripts/seed.ts",
  ],
  ignoreDependencies: [
    /.*tailwindcss.*/,
    /.*eslint.*/,
    /.*tw-animate-css.*/,
    /.*postcss.*/,
  ],
} satisfies KnipConfig
