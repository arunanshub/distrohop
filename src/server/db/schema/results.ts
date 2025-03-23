import { relations, sql } from "drizzle-orm"
import { integer, primaryKey, text } from "drizzle-orm/sqlite-core"
import { answers } from "./answers"
import { ulid } from "@std/ulid"
import { createTable } from "./utils"

export const results = createTable("results", {
  id: text("id")
    .$defaultFn(() => ulid())
    .primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const selectedAnswers = createTable(
  "_selected_answers",
  {
    resultId: text("result_id")
      .references(() => results.id, {
        onDelete: "cascade",
      })
      .notNull(),
    selectedAnswerId: text("selected_answer_id")
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
    resultId: text("result_id")
      .references(() => results.id, {
        onDelete: "cascade",
      })
      .notNull(),
    importantAnswerId: text("important_answer_id")
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
