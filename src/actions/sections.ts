"use server"
import { getDb } from "@/server/db"
import { cacheLife, cacheTag } from "next/cache"

export async function getSections() {
  "use cache: remote"
  cacheLife("days")
  cacheTag("sections")

  const db = getDb()
  return db.query.sections.findMany({
    columns: { id: false },
    orderBy: (sections, { asc }) => [asc(sections.msgid)],
  })
}

export type Section = Awaited<ReturnType<typeof getSections>>[number]
