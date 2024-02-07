import { DatabaseClient } from '@/server/database/db'
import { sections } from '~/server/database/schema/sections'

export async function getSections(db: DatabaseClient, limit: number = 0) {
  return await db.query.sections.findMany({
    limit: limit <= 0 ? undefined : limit,
    with: {
      questions: { columns: { id: true } },
    },
  })
}

export async function getSectionByMsgid(db: DatabaseClient, msgid: string) {
  return await db.query.sections.findFirst({
    where(sections, { eq }) {
      return eq(sections.msgid, msgid)
    },
  })
}

export async function createSection(
  db: DatabaseClient,
  value: typeof sections.$inferInsert
) {
  return await db.transaction(async (tx) => {
    await tx.insert(sections).values(value)
    return await getSectionByMsgid(tx, value.msgid)
  })
}
