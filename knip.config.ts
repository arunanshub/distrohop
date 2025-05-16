import { KnipConfig } from "knip"

export default {
  ignoreDependencies: [/.*eslint.*/, "tailwindcss", "postcss"],
} satisfies KnipConfig
