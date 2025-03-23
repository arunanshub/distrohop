import { relations } from "drizzle-orm"
import { boolean, text, varchar } from "drizzle-orm/pg-core"
import { answers } from "./answers"
import { sections } from "./sections"
import { ulid } from "@std/ulid"
import { createTable } from "./utils"

export const questions = createTable("questions", {
  id: varchar("id", { length: 26 })
    .$defaultFn(() => ulid())
    .primaryKey()
    .notNull(),
  msgid: varchar("msgid").unique().notNull(),
  isMultipleChoice: boolean("is_multiple_choice").default(false),
  isMediaQuestion: boolean("is_media_question").default(false),
  additionalInfo: text("additional_info"),
  sectionId: varchar("section_id", { length: 26 })
    .notNull()
    .references(() => sections.id, {
      onDelete: "cascade",
    }),
})

export const questionsRelations = relations(questions, ({ many, one }) => ({
  answers: many(answers),
  section: one(sections, {
    fields: [questions.sectionId],
    references: [sections.id],
  }),
}))
