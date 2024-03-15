import 'dotenv/config'
import type { Config } from 'drizzle-kit'

const dbName = process.env.DB_NAME
if (!dbName) {
  throw new Error('DB_NAME not set')
}

export default {
  out: 'src/server/database/migrations',
  schema: 'src/server/database/schema/*',
  driver: 'd1',
  dbCredentials: {
    dbName: dbName,
    wranglerConfigPath: 'wrangler.toml',
  },
} satisfies Config
