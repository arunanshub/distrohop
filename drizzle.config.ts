import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { env } from "./src/env"

export default defineConfig({
  schema: "./src/server/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["distrohop_*"],
})
