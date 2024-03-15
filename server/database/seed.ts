import 'dotenv/config'
import { groupBy, mapValues } from 'lodash-es'
import * as answer from '~/server/crud/answer'
import * as question from '~/server/crud/question'
import * as section from '~/server/crud/section'
import { getDb } from '~/server/database/db'
import { distributions } from '~/server/database/schema/distributions'
import distros from '~~/seed-data/distros.json'
import questionData from '~~/seed-data/question-data.json'
import sectionData from '~~/seed-data/sections.json'

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!databaseUrl || !authToken) {
    throw Error('database URL or Auth token not found')
  }
  const db = getDb({ authToken, url: databaseUrl })

  // create the distros
  await Promise.all(
    distros.map(async (distro) =>
      db.insert(distributions).values({ ...distro }),
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
        // @ts-expect-error
        const createdQuestion = await question.createQuestion(tx, {
          ...q,
          sectionId: id as NonNullable<typeof id>,
        })
        // create answers related to question `q`
        await answer.createAnswers(
          // @ts-expect-error
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

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
