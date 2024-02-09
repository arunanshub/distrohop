import type { DatabaseClient } from '@/server/database/db'
import { questions } from '../database/schema/questions'

export async function getQuestionByMsgid(db: DatabaseClient, msgid: string) {
  return await db.query.questions.findFirst({
    where(questions, { eq }) {
      return eq(questions.msgid, msgid)
    },
    with: {
      answers: {
        columns: { id: false },
      },
    },
  })
}

// FIXME: the type inferred is wrong when there is a conditional query
// For reference: https://github.com/drizzle-team/drizzle-orm/issues/824
export async function getQuestionByMsgidWithoutIdWithAnswers(
  db: DatabaseClient,
  msgid: string,
) {
  return await db.query.questions.findFirst({
    where(questions, { eq }) {
      return eq(questions.msgid, msgid)
    },
    with: {
      answers: {
        columns: { id: false, questionId: false },
        with: {
          blocks: {
            with: { blockedBy: { columns: { msgid: true } } },
            columns: {},
          },
          blockedBy: {
            with: { answer: { columns: { msgid: true } } },
            columns: {},
          },
        },
      },
    },
    columns: { id: false, sectionId: false },
  })
}

export type QuestionWithAnswers = NonNullable<
  Awaited<ReturnType<typeof getQuestionByMsgidWithoutIdWithAnswers>>
>

export type AnswerWithBlocksBlockedBy = QuestionWithAnswers['answers'][number]

export async function createQuestion(
  db: DatabaseClient,
  value: typeof questions.$inferInsert,
) {
  return await db.transaction(async (tx) => {
    await tx.insert(questions).values(value)
    const question = await getQuestionByMsgid(tx, value.msgid)
    return question as NonNullable<typeof question>
  })
}

export async function createQuestions(
  db: DatabaseClient,
  values: (typeof questions.$inferInsert)[],
) {
  return await db.transaction(async (tx) => {
    await tx.insert(questions).values(values)
    return await getQuestionsByMsgids(
      tx,
      values.map((v) => v.msgid),
    )
  })
}

async function getQuestionsByMsgids(db: DatabaseClient, msgids: string[]) {
  return await db.query.questions.findMany({
    where(fields, { eq, and }) {
      const queries = []
      for (const msgid of msgids) {
        queries.push(eq(fields.msgid, msgid))
      }
      return and(...queries)
    },
  })
}
