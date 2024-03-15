import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { questions } from './questions'

export const sections = sqliteTable('sections', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  msgid: text('msgid', { length: 100 }).unique().notNull(),
  iconName: text('icon_name', { length: 100 }).notNull(),
})

export const sectionsRelations = relations(sections, ({ one }) => ({
  question: one(questions, {
    fields: [sections.id],
    references: [questions.sectionId],
  }),
}))
