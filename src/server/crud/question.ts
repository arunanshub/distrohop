import { DatabaseClient } from '@/server/database/db'
import { questions } from '../database/schema/questions'

export async function getQuestionByMsgid(db: DatabaseClient, msgid: string) {
  return await db.query.questions.findFirst({
    where(questions, { eq }) {
      return eq(questions.msgid, msgid)
    },
    with: {
      section: { columns: { msgid: true } },
    },
  })
}

export async function createQuestion(
  db: DatabaseClient,
  value: typeof questions.$inferInsert
) {
  return await db.transaction(async (tx) => {
    await tx.insert(questions).values(value)
    return await getQuestionByMsgid(tx, value.msgid)!
  })
}

export async function createQuestions(
  db: DatabaseClient,
  values: (typeof questions.$inferInsert)[]
) {
  return await db.transaction(async (tx) => {
    await tx.insert(questions).values(values)
    return await getQuestionsByMsgids(
      tx,
      values.map((v) => v.msgid)
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
