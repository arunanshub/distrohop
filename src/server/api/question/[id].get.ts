import { questionWithAnswers, QuestionWithAnswers } from '@/types'

export default defineCachedEventHandler(
  async (event): Promise<QuestionWithAnswers> => {
    const prisma = event.context.prisma
    const question = await prisma.question.findFirst({
      where: {
        msgid: event.context.params!.id,
      },
      ...questionWithAnswers,
      cacheStrategy: { swr: 60, ttl: 60 },
    })
    if (!question) {
      throw createError({ statusCode: 404, message: 'Question not found' })
    }
    return question
  },
  { swr: true, staleMaxAge: 300 }
)
