import { relations } from 'drizzle-orm'
import {
  boolean,
  char,
  index,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core'
import { answers } from './answers'
import { sections } from './sections'

export const questions = mysqlTable('questions', {
  id: char('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  msgid: varchar('msgid', { length: 100 }).unique().notNull(),
  isMultipleChoice: boolean('is_multiple_choice').default(false),
  isMediaQuestion: boolean('is_media_question').default(false),
  additionalInfo: varchar('additional_info', { length: 256 }),
  sectionId: char('section_id', { length: 36 })
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
