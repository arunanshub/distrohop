import { type Prisma } from '@prisma/client'

export const answerWithoutQuestionId = {
  select: {
    mediaSourcePath: true,
    msgid: true,
  },
} satisfies Prisma.AnswerDefaultArgs

export const answer = {
  select: {
    ...answerWithoutQuestionId.select,
    blockedBy: answerWithoutQuestionId,
  },
} satisfies Prisma.AnswerDefaultArgs

export type Answer = Prisma.AnswerGetPayload<typeof answer>

export const questionWithAnswers = {
  select: {
    msgid: true,
    additionalInfo: true,
    isMediaQuestion: true,
    isMultipleChoice: true,
    answers: answer,
  },
} satisfies Prisma.QuestionDefaultArgs

export type QuestionWithAnswers = Prisma.QuestionGetPayload<
  typeof questionWithAnswers
>

export const sectionWithQuestionId = {
  select: {
    msgid: true,
    iconName: true,
    question: {
      select: {
        msgid: true,
      },
    },
  },
} satisfies Prisma.SectionDefaultArgs

export type SectionWithQuestionId = Prisma.SectionGetPayload<
  typeof sectionWithQuestionId
>
