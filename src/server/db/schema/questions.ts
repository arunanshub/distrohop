import { relations } from "drizzle-orm"
import { integer, text } from "drizzle-orm/sqlite-core"
import { answers } from "./answers"
import { sections } from "./sections"
import { ulid } from "@std/ulid"
import { createTable } from "./utils"

export const questions = createTable("questions", {
  id: text("id")
    .$defaultFn(() => ulid())
    .primaryKey()
    .notNull(),
  msgid: text("msgid").unique().notNull(),
  isMultipleChoice: integer("is_multiple_choice", { mode: "boolean" }).default(
    false,
  ),
  isMediaQuestion: integer("is_media_question", { mode: "boolean" }).default(
    false,
  ),
  additionalInfo: text("additional_info"),
  sectionId: text("section_id")
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
