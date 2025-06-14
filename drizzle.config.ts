import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { env } from "./src/env"

export default defineConfig({
  schema: "./src/server/db/schema",
  // out is required to avoid drizzle-kit bug.
  // see: https://github.com/drizzle-team/drizzle-orm/issues/3226#issuecomment-2477984087
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["distrohop_*"],
})
