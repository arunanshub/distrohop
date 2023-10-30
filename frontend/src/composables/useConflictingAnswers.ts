import type { Answer } from '~/types'

export default (
  collectedAnswers: Ref<Set<string>>,
  currentAnswers: Answer[]
) => {
  function getConflictingAnswers(answerId: string) {
    const answer = currentAnswers.find((ans) => ans.msgid === answerId)
    if (!answer) {
      return
    }
    const blockedByIds = answer.blockedBy.map((ans) => ans.msgid)
    return blockedByIds.filter((ans) => collectedAnswers.value.has(ans))
  }
  return { getConflictingAnswers } as const
}
