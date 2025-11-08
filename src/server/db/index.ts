import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "@/env"
import * as schema from "./schema"
import postgres from "postgres"

/**
 * Cache the database client in development to avoid recreating it during HMR.
 */
const globalClient = globalThis as unknown as {
  db: ReturnType<typeof createDb> | undefined
}

function createDb() {
  const client = postgres(env.DATABASE_URL, { prepare: false })
  return drizzle(client, { schema: { ...schema } })
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
