import { env } from "@/env"
import type { NextConfig } from "next"
import createMdx from "@next/mdx"

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  output: env.STANDALONE_IN_PROD ? "standalone" : undefined,
  images: {
    remotePatterns: [
      new URL("https://upload.wikimedia.org/wikipedia/commons/**"),
      new URL("https://i.postimg.cc/xC3Bp0m5/*"),
    ],
  },
  experimental: {
    webpackMemoryOptimizations: true,
  },
}

const withMdx = createMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMdx(nextConfig)
