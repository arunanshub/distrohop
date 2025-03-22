import { env } from "@/env"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },

  output: env.STANDALONE_IN_PROD ? "standalone" : undefined,
}

export default nextConfig
