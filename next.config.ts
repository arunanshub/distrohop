import { env } from "@/env"
import type { NextConfig } from "next"
import createMdx from "@next/mdx"

const nextConfig: NextConfig = {
  output: env.STANDALONE_IN_PROD ? "standalone" : undefined,
  reactCompiler: true,
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  experimental: {
    webpackMemoryOptimizations: true,
  },
  images: {
    remotePatterns: [
      new URL("https://upload.wikimedia.org/wikipedia/commons/**"),
      new URL("https://i.postimg.cc/xC3Bp0m5/*"),
    ],
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
