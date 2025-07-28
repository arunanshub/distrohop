import { env } from "@/env"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    inlineCss: true,
    reactCompiler: true,
  },

  output: env.STANDALONE_IN_PROD ? "standalone" : undefined,

  images: {
    remotePatterns: [
      new URL("https://upload.wikimedia.org/wikipedia/commons/**"),
      new URL("https://i.postimg.cc/xC3Bp0m5/*"),
    ],
  },
}

export default nextConfig
