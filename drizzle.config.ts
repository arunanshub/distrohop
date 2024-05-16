import 'dotenv/config'
import type { Config } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN
if (!databaseUrl || !authToken) {
  throw new Error(
    'Either DATABASE_URL or TURSO_AUTH_TOKEN not set in the environment variables.',
  )
}

export default {
  out: 'src/server/database/migrations',
  schema: 'src/server/database/schema/*',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseUrl,
    authToken,
  },
} satisfies Config
