import type { AnswerWithBlocksBlockedBy } from '~/server/crud/question'

export default (
  collectedAnswers: Ref<Set<string>>,
  answer: AnswerWithBlocksBlockedBy,
) => {
  const conflictingAnswers = computed(() =>
    answer.blockedBy
      .map((x) => x.answer.msgid)
      .concat(answer.blocks.map((x) => x.blockedBy.msgid))
      .filter((ans) => collectedAnswers.value.has(ans)),
  )

  return { conflictingAnswers } as const
}
