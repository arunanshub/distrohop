import { drizzle } from "drizzle-orm/node-postgres"
import { env } from "@/env"
import * as schema from "./schema"

/**
 * Cache the database client in development to avoid recreating it during HMR.
 */
const globalClient = globalThis as unknown as {
  db: ReturnType<typeof createDb> | undefined
}

function createDb() {
  return drizzle(env.DATABASE_URL, {
    schema: { ...schema },
    // logger: env.NODE_ENV === "development",
  })
}

export function getDb() {
  if (globalClient.db) {
    return globalClient.db
  }
  const db = createDb()
  if (env.NODE_ENV !== "production") {
    globalClient.db = db
  }
  return db
}

export const tables = schema
