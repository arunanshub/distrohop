import type { Answer } from '~/types'

export default (
  collectedAnswers: Ref<Set<string>>,
  answer: Answer,
) => {
  const conflictingAnswers = computed(() => {
    const blockedByIds = answer.blockedBy.map((ans) => ans.msgid)
    return blockedByIds.filter((ans) => collectedAnswers.value.has(ans))
  })

  return { conflictingAnswers } as const
}
