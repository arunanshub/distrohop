import type { DatabaseClient } from '@/server/database/db'
import type { SetOptional } from 'type-fest'
import { sections } from '~/server/database/schema/sections'

export async function getSectionsWithoutId(db: DatabaseClient, limit = 0) {
  const sections = await db.query.sections.findMany({
    limit: limit <= 0 ? undefined : limit,
    columns: { id: false },
    with: { question: { columns: { msgid: true } } },
  })
  return sections as SectionWithoutId[]
}

export async function getSectionByMsgid(db: DatabaseClient, msgid: string) {
  return await db.query.sections.findFirst({
    where(sections, { eq }) {
      return eq(sections.msgid, msgid)
    },
    with: { question: { columns: { msgid: true } } },
  })
}

export async function getSectionByMsgidWithoutId(
  db: DatabaseClient,
  msgid: string,
) {
  return await db.query.sections.findFirst({
    where(sections, { eq }) {
      return eq(sections.msgid, msgid)
    },
    with: { question: { columns: { msgid: true } } },
  })
}

export type SectionWithoutId = SetOptional<
  NonNullable<Awaited<ReturnType<typeof getSectionByMsgidWithoutId>>>,
  'question'
>

export async function createSection(
  db: DatabaseClient,
  value: typeof sections.$inferInsert,
) {
  return await db.transaction(async (tx) => {
    await tx.insert(sections).values(value)
    // @ts-expect-error
    return await getSectionByMsgid(tx, value.msgid)
  })
}
