import { createClient, type Client } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { env } from "@/env"
import * as schema from "./schema"

/**
 * Cache the database client globally to avoid recreating it unnecessarily.
 */
const globalClient = globalThis as unknown as {
  client: Client | undefined
}

export function getClient() {
  if (!globalClient.client) {
    globalClient.client = createClient({ url: env.DATABASE_URL })
    if (env.NODE_ENV !== "production") {
      // Cache the client in development for HMR
      globalClient.client = globalClient.client
    }
  }
  return globalClient.client
}

export function getDb() {
  const client = getClient()
  return drizzle(client, {
    schema: { ...schema },
    logger: env.NODE_ENV === "development",
  })
}

export const tables = schema
