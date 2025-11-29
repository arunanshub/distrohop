import { KnipConfig } from "knip"

export default {
  ignoreDependencies: [/^.*eslint.*$/, "postcss"],
  ignore: ["src/components/ui/*", "scripts/*"],
  entry: ["src/server/db/schema/index.ts"],
} satisfies KnipConfig
