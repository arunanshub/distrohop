import 'dotenv/config'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { getDb } from '~/server/database/db'

// This will run migrations on the database, skipping the ones already applied
await migrate(getDb(process.env.DATABASE_URL!), {
  migrationsFolder: './src/server/database/migrations',
})
