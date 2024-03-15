import 'dotenv/config'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { getDb } from '~/server/database/db'

const databaseUrl = process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!databaseUrl || !authToken) {
  throw Error(
    'Either database URL (DATABASE_URL) or Turso Auth token (TURSO_AUTH_TOKEN) not set in environment variable',
  )
}
// This will run migrations on the database, skipping the ones already applied
migrate(getDb({ url: databaseUrl, authToken }), {
  migrationsFolder: './src/server/database/migrations',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
