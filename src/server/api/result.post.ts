import { type PrismaClient } from '@prisma/client'
import { array, string, minLength, object, Output, parse } from 'valibot'

const schema = object({
  importantAnswers: array(
    string([minLength(1, 'Length of each answer must be non-zero')])
  ),
  selectedAnswers: array(
    string([minLength(1, 'Length of each answer must be non-zero')]),
    [minLength(1, 'Atleast one answer must be selected')]
  ),
})

type UserResponse = Output<typeof schema>

async function hasInvalidAnswer(prisma: PrismaClient, answers: string[]) {
  const count = await prisma.answer.count({
    where: {
      msgid: { in: answers },
    },
  })
  return count !== answers.length
}

async function throwErrorIfHasInvalidAnswer(
  prisma: PrismaClient,
  response: UserResponse
) {
  if (
    await hasInvalidAnswer(
      prisma,
      response.importantAnswers.concat(response.selectedAnswers)
    )
  ) {
    throw createError({
      statusCode: 400,
      message: 'Found atleast one invalid answer',
    })
  }
}

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma

  const resp = await readValidatedBody(event, (i) => parse(schema, i))
  await throwErrorIfHasInvalidAnswer(prisma, resp)

  const created = await prisma.result.create({
    data: {
      importantAnswers: {
        connect: resp.importantAnswers.map((answer) => ({
          msgid: answer,
        })),
      },
      selectedAnswers: {
        connect: resp.selectedAnswers.map((answer) => ({
          msgid: answer,
        })),
      },
    },
    include: {
      importantAnswers: true,
      selectedAnswers: true,
    },
  })
  return created
})
