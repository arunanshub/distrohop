import type { DatabaseClient } from '@/server/database/db'
import { eq } from 'drizzle-orm'
import { answers, answersBlocked } from '../database/schema/answers'

export async function getAnswerByMsgid(db: DatabaseClient, msgid: string) {
  return await db.query.answers.findFirst({
    where: (answers, { eq }) => {
      return eq(answers.msgid, msgid)
    },
  })
}

export async function getAnswersByMsgids(db: DatabaseClient, msgids: string[]) {
  return await db.query.answers.findMany({
    where: (answers, { eq, or }) => {
      return or(...msgids.map((msgid) => eq(answers.msgid, msgid)))
    },
    with: {
      question: { columns: { msgid: true } },
    },
    columns: { id: false },
  })
}

export async function createAnswer(
  db: DatabaseClient,
  value: typeof answers.$inferInsert,
) {
  return await db.transaction(async (tx) => {
    await tx.insert(answers).values(value)
    // @ts-expect-error
    return await getAnswerByMsgid(tx, value.msgid)
  })
}

export async function createAnswers(
  db: DatabaseClient,
  values: (typeof answers.$inferInsert)[],
) {
  return await db.transaction(async (tx) => {
    await tx.insert(answers).values(values)
    return await getAnswersByMsgids(
      // @ts-expect-error
      tx,
      values.map((v) => v.msgid),
    )
  })
}

export async function addAnswerBlockedBy(
  db: DatabaseClient,
  answerMsgid: string,
  blockedByMsgids: string[],
) {
  // get the answer id
  const answerId = await db.query.answers.findFirst({
    where: ({ msgid }, { eq }) => eq(msgid, answerMsgid),
    columns: { id: true },
  })
  if (!answerId) {
    return
  }

  await db.transaction(async (tx) => {
    const blockedByIds = await tx.query.answers.findMany({
      columns: { id: true },
      where: ({ msgid }, { eq, or }) => {
        return or(...blockedByMsgids.map((id) => eq(msgid, id)))
      },
    })
    await tx.insert(answersBlocked).values(
      blockedByIds.map(({ id }) => ({
        answerId: answerId.id,
        blockedByAnswerId: id,
      })),
    )
  })

  return await db.query.answers.findFirst({
    where({ id }, { eq }) {
      return eq(id, answerId.id)
    },
    with: {
      blockedBy: {
        with: { answer: { columns: { msgid: true } } },
      },
    },
    columns: { id: false },
  })
}
