import type { SectionWithoutId } from '~/server/crud/section'

export default async function (section: Ref<SectionWithoutId | undefined>) {
  const msgid = section.value?.question?.msgid

  const {
    data: question,
    error,
    status,
  } = await useLazyFetch(`/api/question/${msgid}`)

  const pending = computed(() => status.value === 'pending')

  return { question, error, pending } as const
}
