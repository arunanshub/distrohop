"use server"

import { getDb, tables } from "@/server/db"
import { eq } from "drizzle-orm"
import { cacheLife, cacheTag } from "next/cache"
import { notFound } from "next/navigation"
import postgres from "postgres"

export async function getQuestion(sectionId: string) {
  "use cache: remote"
  cacheLife("days")
  cacheTag("getQuestion", sectionId)

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
                    with: {
                      answer: {
                        columns: { msgid: true },
                        // include the section that the answer belongs to
                        with: {
                          question: {
                            with: { section: { columns: { msgid: true } } },
                          },
                        },
                      },
                    },
                  },
                  blocks: {
                    columns: { blockedByAnswerId: true },
                    with: {
                      blockedBy: {
                        columns: { msgid: true },
                        // include the section that the blocked answer belongs to
                        with: {
                          question: {
                            with: { section: { columns: { msgid: true } } },
                          },
                        },
                      },
                    },
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
    if (error instanceof postgres.PostgresError && error.code === "P0002") {
      return notFound()
    }
    throw error
  }
}

export type Question = Awaited<ReturnType<typeof getQuestion>>

export type Answer = Question["answers"][number]
