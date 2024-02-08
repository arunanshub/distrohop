import type { AnswerWithBlockedBlockedBy } from '~/server/crud/answer'

export default (
  collectedAnswers: Ref<Set<string>>,
  answer: AnswerWithBlockedBlockedBy,
) => {
  const conflictingAnswers = computed(() =>
    answer.blockedBy
      .concat(answer.blocks)
      .map((ans) => ans.answer.msgid)
      .filter((ans) => collectedAnswers.value.has(ans)),
  )

  return { conflictingAnswers } as const
}
