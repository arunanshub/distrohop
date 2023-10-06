import { PrismaClient } from '@prisma/client'
import questionData from './question-data.json'
import sectionData from './sections.json'
import { Answer } from '~/types'

const prisma = new PrismaClient()

async function main() {
  const sections = await Promise.all(
    sectionData.map(async (section) => {
      return await prisma.section.upsert({
        where: { msgid: section.msgid },
        update: {},
        create: { ...section },
      })
    })
  )

  // we hold off updating the blockedBy field of each answer to the last.
  // this is because we need to create the answers first, then establish
  // a connection between the answer and their blockedBy fields.
  let answersToBeUpdatedBlockedBy: Answer[] = []

  await Promise.all(
    questionData.map(async ({ question, answers }, index) => {
      return await prisma.question.upsert({
        update: {},
        where: { msgid: question.msgid },
        create: {
          msgid: question.msgid,
          additionalInfo: question.additionalInfo,
          // NOTE: we know that there are as many sections as there are questions
          section: { connect: sections[index] },
          answers: {
            connectOrCreate: answers.map((answer) => {
              // add the answers that will be updated later on.
              answersToBeUpdatedBlockedBy.push({
                msgid: answer.msgid,
                mediaSourcePath: undefined || answer.mediaSourcePath,
                blockedBy: answer.blockedBy.map((blockedBy) => ({
                  msgid: blockedBy,
                  mediaSourcePath: null,
                })),
              })
              return {
                create: {
                  msgid: answer.msgid,
                  mediaSourcePath: answer.mediaSourcePath,
                },
                where: {
                  msgid: answer.msgid,
                },
              }
            }),
          },
        },
      })
    })
  )

  // create the connections between the blockedBy field and answers
  await Promise.all(
    answersToBeUpdatedBlockedBy.map(async (answer) => {
      return await prisma.answer.update({
        where: { msgid: answer.msgid },
        data: {
          blockedBy: {
            connect: answer.blockedBy.map((blockedBy) => ({
              msgid: blockedBy.msgid,
            })),
          },
        },
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
