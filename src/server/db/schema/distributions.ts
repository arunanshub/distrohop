import { ulid } from "@std/ulid"
import { text } from "drizzle-orm/pg-core"
import { createTable } from "./utils"

export const distributions = createTable("distributions", {
  id: text("id")
    .$defaultFn(() => ulid())
    .primaryKey(),
  name: text("name").notNull(),
  identifier: text("identifier").notNull().unique(),
  fgColor: text("fg_color"),
  bgColor: text("bg_color"),
  url: text("url"),
})
