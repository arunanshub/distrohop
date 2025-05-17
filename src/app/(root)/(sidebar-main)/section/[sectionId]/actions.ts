"use server"

import { getDb, tables } from "@/server/db"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { DatabaseError } from "pg"

export async function getQuestion(sectionId: string) {
  const db = getDb()

  try {
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
  } catch (error) {
    if (error instanceof DatabaseError && error.code === "P0002") {
      return notFound()
    }
    throw error
  }
}

export type Question = Awaited<ReturnType<typeof getQuestion>>
