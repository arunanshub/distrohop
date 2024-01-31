import { getDb, type DatabaseClient } from '~/server/database/db'

let db: DatabaseClient | null = null

declare module 'h3' {
  interface H3EventContext {
    db: DatabaseClient
  }
}

export default defineEventHandler((event) => {
  if (!db) {
    db = getDb(process.env.DATABASE_URL!)
  }
  event.context.db = db
})
