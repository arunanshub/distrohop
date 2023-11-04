import type { Answer } from '~/types'

export default (collectedAnswers: Ref<Set<string>>, answer: Answer) => {
  const conflictingAnswers = computed(() =>
    answer.blockedBy
      .concat(answer.blocks)
      .map((ans) => ans.msgid)
      .filter((ans) => collectedAnswers.value.has(ans))
  )

  return { conflictingAnswers } as const
}
