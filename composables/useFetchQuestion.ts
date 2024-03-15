import type { SectionWithoutId } from '~/server/crud/section'

export default async function (section: Ref<SectionWithoutId | undefined>) {
  const msgid = section.value?.question?.msgid

  const {
    data: question,
    error,
    pending,
  } = await useLazyFetch(`/api/question/${msgid}`, { server: false })

  return { question, error, pending } as const
}
