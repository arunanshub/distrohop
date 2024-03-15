import 'dotenv/config'
import type { Config } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN
if (!databaseUrl || !authToken) {
  throw new Error('DATABASE_URL or AUTH_TOKEN not set')
}

export default {
  out: 'src/server/database/migrations',
  schema: 'src/server/database/schema/*',
  driver: 'turso',
  dbCredentials: {
    url: databaseUrl,
    authToken,
  },
} satisfies Config
