import "dotenv/config"
import { getDb } from "@/server/db"
import * as schema from "@/server/db/schema"
import { sql } from "drizzle-orm/sql"

import distros from "../data/distros.json"
import sections from "../data/sections.json"
import qna from "../data/qna.json"

async function main() {
  console.log("seeding distros...")
  const db = getDb()
  const insertedDistros = await db
    .insert(schema.distributions)
    .values(distros)
    .onConflictDoUpdate({
      target: [schema.distributions.identifier],
      set: {
        name: sql`excluded.name`,
        bgColor: sql`excluded.bg_color`,
        fgColor: sql`excluded.fg_color`,
        url: sql`excluded.url`,
      },
    })
    .returning()
  console.log(`${insertedDistros.length} distros seeded`)

  console.log("seeding sections...")
  const insertedSections = await db
    .insert(schema.sections)
    .values(sections)
    .onConflictDoUpdate({
      target: [schema.sections.msgid],
      set: {
        iconName: sql`excluded.icon_name`,
      },
    })
    .returning()
  console.log(`${insertedSections.length} sections seeded`)

  console.log("seeding questions...")
  const insertedQuestions = await db
    .insert(schema.questions)
    .values(
      qna.map(({ question }, ix) => ({
        msgid: question.msgid,
        isMultipleChoice: question.isMultipleChoice,
        isMediaQuestion: question.isMediaQuestion,
        additionalInfo: question.additionalInfo,
        sectionId: insertedSections[ix].id,
      })),
    )
    .onConflictDoUpdate({
      target: [schema.questions.msgid],
      set: {
        isMultipleChoice: sql`excluded.is_multiple_choice`,
        isMediaQuestion: sql`excluded.is_media_question`,
        additionalInfo: sql`excluded.additional_info`,
        sectionId: sql`excluded.section_id`,
      },
    })
    .returning({ id: schema.questions.id, msgid: schema.questions.msgid })
  console.log(`${insertedQuestions.length} questions seeded`)

  console.log("seeding answers...")
  const insertedAnswers = await db
    .insert(schema.answers)
    .values(
      qna.flatMap(({ question, answers }) =>
        answers.map((answer) => ({
          msgid: answer.msgid,
          mediaSourcePath: answer.mediaSourcePath,
          questionId: insertedQuestions.find((q) => q.msgid === question.msgid)!
            .id,
        })),
      ),
    )
    .onConflictDoUpdate({
      target: [schema.answers.msgid],
      set: {
        questionId: sql`excluded.question_id`,
        mediaSourcePath: sql`excluded.media_source_path`,
      },
    })
    .returning()
  console.log(`${insertedAnswers.length} answers seeded`)

  console.log("seeding answer relations...")
  for (const { answers } of qna) {
    for (const answer of answers) {
      for (const blockedBy of answer.blockedBy) {
        await db
          .insert(schema.answersBlocked)
          .values({
            answerId: insertedAnswers.find((a) => a.msgid === answer.msgid)!.id,
            blockedByAnswerId: insertedAnswers.find(
              (a) => a.msgid === blockedBy,
            )!.id,
          })
          .onConflictDoNothing()
      }
    }
  }
  console.log(`answer relations seeded`)
}

main()
