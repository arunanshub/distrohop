import type { SectionWithoutId } from '~/server/crud/section'

export default async function (section: Ref<SectionWithoutId | undefined>) {
  const msgid = section.value?.question?.msgid

  const {
    data: question,
    error,
    status,
  } = await useLazyFetch(`/api/question/${msgid}`, { server: false })

  const pending = computed(
    () => status.value === 'idle' || status.value === 'pending',
  )

  return { question, error, pending, status } as const
}
