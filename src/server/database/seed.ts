import { getDb } from '~/server/database/db'
import * as section from '~/server/crud/section'
import * as question from '~/server/crud/question'
import * as answer from '~/server/crud/answer'
import distros from '~~/prisma/distros.json'
import { default as questionData } from '~~/prisma/question-data.json'
import { default as sectionData } from '~~/prisma/sections.json'
import { distributions } from '~/server/database/schema/distributions'
import { sql } from 'drizzle-orm'
import { groupBy, mapValues } from 'lodash-es'

async function main() {
  const db = getDb(process.env.DATABASE_URL!)
  // await db.delete(distributions)
  // await db.delete(questions)
  // await db.delete(answers)
  // await db.delete(sections)
  // await db.delete(answersBlocked)

  // create the distros
  await Promise.all(
    distros.map(async (distro) =>
      db
        .insert(distributions)
        .values({ ...distro })
        .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    )
  )

  // create the sections
  const createdSections = await Promise.all(
    sectionData.map(async (s) => section.createSection(db, s))
  )

  // create the questions and the associated answers
  await Promise.all(
    questionData.map(async ({ question: q, answers: ans }, ix) => {
      return db.transaction(async (tx) => {
        const createdQuestion = await question.createQuestion(tx, {
          ...q,
          sectionId: createdSections[ix]?.id!,
        })
        // create answers related to question `q`
        await answer.createAnswers(
          tx,
          ans.map((a) => ({ questionId: createdQuestion?.id!, ...a }))
        )
        return createdQuestion
      })
    })
  )

  const answersGroupedByMsgid = mapValues(
    groupBy(questionData.map((q) => q.answers).flat(), (ans) => ans.msgid),
    (v) => v[0]
  )

  await Promise.all(
    Object.entries(answersGroupedByMsgid).map(([msgid, { blockedBy }]) => {
      if (!blockedBy.length) {
        return
      }
      return answer.addAnswerBlockedBy(db, msgid, blockedBy!)
    })
  )
}

await main()
