import { relations } from "drizzle-orm"
import { primaryKey, text } from "drizzle-orm/sqlite-core"
import { questions } from "./questions"
import { ulid } from "@std/ulid"
import { createTable } from "./utils"

export const answers = createTable("answers", {
  id: text("id")
    .$defaultFn(() => ulid())
    .primaryKey()
    .notNull(),
  msgid: text("msgid").unique().notNull(),
  mediaSourcePath: text("media_source_path"),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, {
      onDelete: "cascade",
    }),
})

export const answerRelations = relations(answers, ({ one, many }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  blockedBy: many(answersBlocked, { relationName: "blocked_by" }),
  blocks: many(answersBlocked, { relationName: "blocks" }),
}))

export const answersBlocked = createTable(
  "_answers_blocked",
  {
    answerId: text("answer_id")
      .references(() => answers.id, {
        onDelete: "cascade",
      })
      .notNull(),
    blockedByAnswerId: text("blocked_by_answer_id")
      .references(() => answers.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.blockedByAnswerId, t.answerId] })],
)

export const answersBlockedRelations = relations(answersBlocked, ({ one }) => ({
  answer: one(answers, {
    fields: [answersBlocked.answerId],
    references: [answers.id],
    relationName: "blocks",
  }),
  blockedBy: one(answers, {
    fields: [answersBlocked.blockedByAnswerId],
    references: [answers.id],
    relationName: "blocked_by",
  }),
}))
