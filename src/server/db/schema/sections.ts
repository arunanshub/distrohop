import { ulid } from "@std/ulid"
import { relations } from "drizzle-orm"
import { text } from "drizzle-orm/sqlite-core"
import { createTable } from "./utils"
import { questions } from "./questions"

export const sections = createTable("sections", {
  id: text("id")
    .$defaultFn(() => ulid())
    .primaryKey(),
  msgid: text("msgid").unique().notNull(),
  iconName: text("icon_name").notNull(),
})

export const sectionsRelations = relations(sections, ({ one }) => ({
  question: one(questions, {
    fields: [sections.id],
    references: [questions.sectionId],
  }),
}))
