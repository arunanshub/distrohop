"use server"

import { getDb } from "@/server/db"

export async function getSections() {
  const db = getDb()
  return db.query.sections.findMany({
    columns: { id: false },
    orderBy: (sections, { asc }) => [asc(sections.msgid)],
  })
}
