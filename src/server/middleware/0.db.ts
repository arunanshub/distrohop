import { type DatabaseClient, getDb } from '~/server/database/db'

let db: DatabaseClient | null = null

declare module 'h3' {
  interface H3EventContext {
    db: DatabaseClient
  }
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const databaseUrl = config.databaseUrl
  const authToken = config.turso.authToken
  if (!db) {
    db = getDb({ url: databaseUrl, authToken })
  }
  event.context.db = db
})
