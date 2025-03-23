import { relations, sql } from "drizzle-orm"
import { primaryKey, timestamp, varchar } from "drizzle-orm/pg-core"
import { answers } from "./answers"
import { ulid } from "@std/ulid"
import { createTable } from "./utils"

export const results = createTable("results", {
  id: varchar("id", { length: 26 })
    .$defaultFn(() => ulid())
    .primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const selectedAnswers = createTable(
  "_selected_answers",
  {
    resultId: varchar("result_id", { length: 26 })
      .references(() => results.id, {
        onDelete: "cascade",
      })
      .notNull(),
    selectedAnswerId: varchar("selected_answer_id", { length: 26 })
      .references(() => answers.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },

  (t) => [primaryKey({ columns: [t.resultId, t.selectedAnswerId] })],
)

export const importantAnswers = createTable(
  "_important_answers",
  {
    resultId: varchar("result_id", { length: 26 })
      .references(() => results.id, {
        onDelete: "cascade",
      })
      .notNull(),
    importantAnswerId: varchar("important_answer_id", { length: 26 })
      .references(() => answers.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.resultId, t.importantAnswerId] })],
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
