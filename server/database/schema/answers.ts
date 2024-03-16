import { relations } from 'drizzle-orm'
import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { questions } from './questions'

export const answers = sqliteTable('answers', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  msgid: text('msgid', { length: 100 }).unique().notNull(),
  mediaSourcePath: text('media_source_path', { length: 256 }),
  questionId: text('question_id', { length: 36 })
    .notNull()
    .references(() => questions.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})

export const answerRelations = relations(answers, ({ one, many }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  blockedBy: many(answersBlocked, { relationName: 'blocked_by' }),
  blocks: many(answersBlocked, { relationName: 'blocks' }),
}))

export const answersBlocked = sqliteTable(
  '_answers_blocked',
  {
    answerId: text('answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    blockedByAnswerId: text('blocked_by_answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.blockedByAnswerId, t.answerId] }),
  }),
)

export const answersBlockedRelations = relations(answersBlocked, ({ one }) => ({
  answer: one(answers, {
    fields: [answersBlocked.answerId],
    references: [answers.id],
    relationName: 'blocks',
  }),
  blockedBy: one(answers, {
    fields: [answersBlocked.blockedByAnswerId],
    references: [answers.id],
    relationName: 'blocked_by',
  }),
}))
