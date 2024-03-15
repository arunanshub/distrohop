import { maxLength, minLength, parse, string } from 'valibot'
import { getQuestionByMsgidWithoutIdWithAnswers } from '~/server/crud/question'

const schema = string([minLength(1), maxLength(255)])

export default defineCachedEventHandler(
  async (event) => {
    // biome-ignore lint/suspicious/noExplicitAny: `v` is router params obj
    const id = await getValidatedRouterParams(event, (v: any) =>
      parse(schema, v.id),
    )
    const question = await getQuestionByMsgidWithoutIdWithAnswers(
      event.context.db,
      id,
    )
    if (!question) {
      throw createError({ statusCode: 404, message: 'Question not found' })
    }
    return question
  },
  { swr: true, staleMaxAge: 3600 },
)
