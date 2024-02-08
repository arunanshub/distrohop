import { sql } from 'drizzle-orm'
import { groupBy, mapValues } from 'lodash-es'
import * as answer from '~/server/crud/answer'
import * as question from '~/server/crud/question'
import * as section from '~/server/crud/section'
import { getDb } from '~/server/database/db'
import { distributions } from '~/server/database/schema/distributions'
import distros from '~~/prisma/distros.json'
import { default as questionData } from '~~/prisma/question-data.json'
import { default as sectionData } from '~~/prisma/sections.json'

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw Error('database URL not found')
  }
  const db = getDb(databaseUrl)

  // create the distros
  await Promise.all(
    distros.map(async (distro) =>
      db
        .insert(distributions)
        .values({ ...distro })
        .onDuplicateKeyUpdate({ set: { id: sql`id` } }),
    ),
  )

  // create the sections
  const createdSections = await Promise.all(
    sectionData.map(async (s) => section.createSection(db, s)),
  )

  // create the questions and the associated answers
  await Promise.all(
    questionData.map(async ({ question: q, answers: ans }, ix) => {
      return db.transaction(async (tx) => {
        const id = createdSections[ix]?.id
        const createdQuestion = await question.createQuestion(tx, {
          ...q,
          sectionId: id as NonNullable<typeof id>,
        })
        // create answers related to question `q`
        await answer.createAnswers(
          tx,
          ans.map((a) => ({ questionId: createdQuestion?.id, ...a })),
        )
        return createdQuestion
      })
    }),
  )

  const answersGroupedByMsgid = mapValues(
    groupBy(
      questionData.flatMap(
        (q) =>
          q.answers as {
            msgid: string
            blockedBy: string[]
            mediaSourcePath: string | null
          }[],
      ),
      (ans) => ans.msgid,
    ),
    (v) => v[0],
  )

  await Promise.all(
    Object.entries(answersGroupedByMsgid).map(([msgid, { blockedBy }]) => {
      if (!blockedBy.length) {
        return
      }
      return answer.addAnswerBlockedBy(db, msgid, blockedBy)
    }),
  )
}

await main()
