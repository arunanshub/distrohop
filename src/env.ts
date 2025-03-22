import { createEnv } from "@t3-oss/env-nextjs"
import * as v from "valibot"

export const env = createEnv({
  // server only env vars
  server: {
    DATABASE_URL: v.pipe(v.string(), v.url()),
    NODE_ENV: v.union([
      v.literal("development"),
      v.literal("production"),
      v.literal("test"),
    ]),
    STANDALONE_IN_PROD: v.optional(
      v.pipe(
        v.union([v.literal("true"), v.literal("false")]),
        v.transform((val) => val === "true"),
        v.boolean(),
      ),
      "false",
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
