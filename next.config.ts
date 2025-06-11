import { env } from "@/env"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    inlineCss: true,
  },

  output: env.STANDALONE_IN_PROD ? "standalone" : undefined,

  images: {
    remotePatterns: [
      new URL("https://upload.wikimedia.org/wikipedia/commons/**"),
      new URL("https://betawiki.net/images/**"),
    ],
  },
}

export default nextConfig
