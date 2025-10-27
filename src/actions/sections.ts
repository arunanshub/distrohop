"use server"
import { getDb } from "@/server/db"
import { connection } from "next/server"

export async function getSections() {
  await connection()

  const db = getDb()
  return db.query.sections.findMany({
    columns: { id: false },
    orderBy: (sections, { asc }) => [asc(sections.msgid)],
  })
}

export type Section = Awaited<ReturnType<typeof getSections>>[number]
