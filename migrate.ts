import 'dotenv/config'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { getDb } from '~/server/database/db'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw Error('Database URL not configured in environment variable')
}
// This will run migrations on the database, skipping the ones already applied
await migrate(getDb(databaseUrl), {
  migrationsFolder: './src/server/database/migrations',
})
