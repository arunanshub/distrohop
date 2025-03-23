import { getDb, tables } from "@/server/db"
import { eq } from "drizzle-orm"

export async function getQuestionBySection(sectionId: string) {
  const db = getDb()
  return await db.query.sections
    .findFirst({
      where: eq(tables.sections.msgid, sectionId),
      orderBy: (sections, { asc }) => [asc(sections.msgid)],
      columns: { msgid: true },
      with: {
        question: {
          columns: { id: false },
          with: {
            answers: {
              columns: { id: false },
              with: {
                blockedBy: {
                  with: { answer: { columns: { msgid: true } } },
                },
                blocks: {
                  with: { answer: { columns: { msgid: true } } },
                },
              },
            },
          },
        },
      },
    })
    .then((section) => {
      return section?.question
    })
}
