import 'dotenv/config'
import { type Config } from 'drizzle-kit'

export default {
  out: 'src/server/database/migrations',
  schema: 'src/server/database/schema/*',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
    database: process.env.DATABASE_NAME!,
  },
} satisfies Config
