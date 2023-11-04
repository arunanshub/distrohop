import { type SectionWithQuestionId } from '~/types'

export default async function (section: Ref<SectionWithQuestionId>) {
  const msgid = section.value.question?.msgid

  const {
    data: question,
    error,
    pending,
  } = await useLazyFetch(`/_api/question/${msgid}`, { server: false })

  return { question, error, pending } as const
}
