import { relations } from 'drizzle-orm'
import { char, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { questions } from './questions'

export const sections = mysqlTable('sections', {
  id: char('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  msgid: varchar('msgid', { length: 100 }).unique().notNull(),
  iconName: varchar('icon_name', { length: 100 }).notNull(),
})

export const sectionsRelations = relations(sections, ({ one }) => ({
  question: one(questions, {
    fields: [sections.id],
    references: [questions.sectionId],
  }),
}))
