import { relations } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { answers } from './answers'
import { sections } from './sections'

export const questions = sqliteTable('questions', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  msgid: text('msgid', { length: 100 }).unique().notNull(),
  isMultipleChoice: integer('is_multiple_choice', { mode: 'boolean' }).default(
    false,
  ),
  isMediaQuestion: integer('is_media_question', { mode: 'boolean' }).default(
    false,
  ),
  additionalInfo: text('additional_info', { length: 256 }),
  sectionId: text('section_id', { length: 36 })
    .notNull()
    .references(() => sections.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})

export const questionsRelations = relations(questions, ({ many, one }) => ({
  answers: many(answers),
  section: one(sections, {
    fields: [questions.sectionId],
    references: [sections.id],
  }),
}))
