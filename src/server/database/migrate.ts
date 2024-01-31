import 'dotenv/config'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { getDb } from './db'

console.log(process.env.DATABASE_URL)
// This will run migrations on the database, skipping the ones already applied
await migrate(getDb(process.env.DATABASE_URL!), {
  migrationsFolder: './migrations',
})
