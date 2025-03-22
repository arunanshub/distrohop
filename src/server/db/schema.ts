import { sql } from "drizzle-orm"
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core"

const createTable = sqliteTableCreator((name) => `distrohop_${name}`)

export const posts = createTable("post", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
})
