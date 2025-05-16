import { KnipConfig } from "knip"

export default {
  ignoreDependencies: [
    /.*eslint.*/,
    "tailwindcss",
    "postcss",
    "tw-animate-css",
  ],
  ignore: ["src/components/ui/*"],
} satisfies KnipConfig
