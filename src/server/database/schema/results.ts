import { relations } from 'drizzle-orm'
import { mysqlTable, char, timestamp, primaryKey } from 'drizzle-orm/mysql-core'
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
  })
)

export const importantAnswers = mysqlTable('_important_answers', {
  resultId: char('result_id', { length: 36 })
    .references(() => results.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  importantAnswerId: char('important_answer_id', { length: 36 })
    .references(() => answers.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
})

export const answersRelations = relations(results, ({ many }) => ({
  importantAnswers: many(importantAnswers),
  selectedAnswers: many(selectedAnswers),
}))

export const selectedAnswersRelations = relations(
  selectedAnswers,
  ({ many }) => ({
    results: many(results),
  })
)

export const importantAnswersRelations = relations(
  selectedAnswers,
  ({ many }) => ({
    results: many(results),
  })
)
