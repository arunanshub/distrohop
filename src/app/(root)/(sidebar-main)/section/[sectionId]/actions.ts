"use server"

import { getDb, tables } from "@/server/db"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { DatabaseError } from "pg"

export async function getQuestion(sectionId: string) {
  const db = getDb()

  try {
    const data = await db.query.sections
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
                    columns: { blockedByAnswerId: true },
                    with: { answer: { columns: { msgid: true } } },
                  },
                  blocks: {
                    columns: { blockedByAnswerId: true },
                    with: { blockedBy: { columns: { msgid: true } } },
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

    if (!data) {
      return notFound()
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError && error.code === "P0002") {
      return notFound()
    }
    throw error
  }
}

export type Question = Awaited<ReturnType<typeof getQuestion>>

export type Answer = Question["answers"][number]
