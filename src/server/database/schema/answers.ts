import {
  mysqlTable,
  char,
  varchar,
  primaryKey,
  index,
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { questions } from './questions'

export const answers = mysqlTable('answers', {
  id: char('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  msgid: varchar('msgid', { length: 100 }).unique().notNull(),
  mediaSourcePath: varchar('media_source_path', { length: 256 }),
  questionId: char('question_id', { length: 36 })
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

export const answersBlocked = mysqlTable(
  '_answers_blocked',
  {
    answerId: char('answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    blockedByAnswerId: char('blocked_by_answer_id', { length: 36 })
      .references(() => answers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.blockedByAnswerId, t.answerId] }),
  })
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
