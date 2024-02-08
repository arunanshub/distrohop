import { relations } from 'drizzle-orm'
import { char, mysqlTable, primaryKey, timestamp } from 'drizzle-orm/mysql-core'
import { answers } from './answers'

export const results = mysqlTable('results', {
  id: char('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})

export const selectedAnswers = mysqlTable(
  '_selected_answers',
  {
    resultId: char('result_id', { length: 36 })
      .references(() => results.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    selectedAnswerId: char('selected_answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },

  (t) => ({
    pk: primaryKey({ columns: [t.resultId, t.selectedAnswerId] }),
  }),
)

export const importantAnswers = mysqlTable(
  '_important_answers',
  {
    resultId: char('result_id', { length: 36 })
      .references(() => results.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    importantAnswerId: char('important_answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.resultId, t.importantAnswerId] }),
  }),
)

export const answersRelations = relations(results, ({ many }) => ({
  selectedAnswers: many(selectedAnswers),
  importantAnswers: many(importantAnswers),
}))

export const selectedAnswersRelations = relations(
  selectedAnswers,
  ({ one }) => ({
    result: one(results, {
      fields: [selectedAnswers.selectedAnswerId],
      references: [results.id],
    }),
  }),
)

export const importantAnswersRelations = relations(
  importantAnswers,
  ({ one }) => ({
    result: one(results, {
      fields: [importantAnswers.importantAnswerId],
      references: [results.id],
    }),
  }),
)
