import { db } from "@/server/db"

export async function getSections() {
  return db.query.sections.findMany({
    columns: { id: false },
    orderBy: (sections, { asc }) => [asc(sections.msgid)],
  })
}
