import { type DatabaseClient, getDb } from '~/server/database/db'

let db: DatabaseClient | null = null

declare module 'h3' {
  interface H3EventContext {
    db: DatabaseClient
  }
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  if (!db) {
    db = getDb(config.databaseUrl)
  }
  event.context.db = db
})
