import { ulid } from "@std/ulid"
import { text, varchar } from "drizzle-orm/pg-core"
import { createTable } from "./utils"

export const distributions = createTable("distributions", {
  id: varchar("id", { length: 26 })
    .$defaultFn(() => ulid())
    .primaryKey(),
  name: varchar("name").notNull(),
  identifier: varchar("identifier").notNull().unique(),
  fgColor: varchar("fg_color"),
  bgColor: varchar("bg_color"),
  url: text("url"),
})
