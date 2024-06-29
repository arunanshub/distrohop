import * as v from 'valibot'
import { getQuestionByMsgidWithoutIdWithAnswers } from '~/server/crud/question'

const schema = v.pipe(v.string(), v.maxLength(255))

export default defineCachedEventHandler(
  async (event) => {
    // biome-ignore lint/suspicious/noExplicitAny: `v` is router params obj
    const id = await getValidatedRouterParams(event, (d: any) =>
      v.parse(schema, d.id),
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
