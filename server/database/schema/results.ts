import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { answers } from './answers'

export const results = sqliteTable('results', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const selectedAnswers = sqliteTable(
  '_selected_answers',
  {
    resultId: text('result_id', { length: 36 })
      .references(() => results.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    selectedAnswerId: text('selected_answer_id', { length: 36 })
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

export const importantAnswers = sqliteTable(
  '_important_answers',
  {
    resultId: text('result_id', { length: 36 })
      .references(() => results.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    importantAnswerId: text('important_answer_id', { length: 36 })
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
