import { KnipConfig } from "knip"

export default {
  ignoreDependencies: [
    /.*eslint.*/,
    "tailwindcss",
    "postcss",
    "tw-animate-css",
  ],
  ignore: ["src/components/ui/*", "scripts/*"],
  entry: ["src/server/db/schema/index.ts"],
} satisfies KnipConfig
