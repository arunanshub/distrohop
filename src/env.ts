import { createEnv } from "@t3-oss/env-nextjs"
import * as v from "valibot"

export const env = createEnv({
  // server only env vars
  server: {
    NODE_ENV: v.optional(
      v.picklist(["development", "production", "test"]),
      "development",
    ),
    DATABASE_URL: v.pipe(v.string(), v.url()),
    STANDALONE_IN_PROD: v.optional(
      v.pipe(
        v.union([v.literal("true"), v.literal("false")]),
        v.transform((val) => val === "true"),
        v.boolean(),
      ),
      "false",
    ),
    // TODO: see app/layout.tsx on why this should be removed
    VERCEL_URL: v.optional(
      v.pipe(
        v.string(),
        v.transform((u) => `https://${u}`),
        v.url(),
      ),
      "https://distrohop.vercel.app",
    ),
  },

  // client only env vars
  client: {},

  // extract client env vars here
  experimental__runtimeEnv: {},

  // env vars like ENV_FOO="" are converted to undefined
  emptyStringAsUndefined: true,

  // we may not have all the variables readily available during docker build
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
