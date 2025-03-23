import { ulid } from "@std/ulid"
import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"
import { createTable } from "./utils"
import { questions } from "./questions"

export const sections = createTable("sections", {
  id: varchar("id", { length: 26 })
    .$defaultFn(() => ulid())
    .primaryKey()
    .notNull(),
  msgid: varchar("msgid").unique().notNull(),
  iconName: varchar("icon_name").notNull(),
})

export const sectionsRelations = relations(sections, ({ one }) => ({
  question: one(questions, {
    fields: [sections.id],
    references: [questions.sectionId],
  }),
}))
