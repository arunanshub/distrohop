import type { AnswerWithBlockedBlockedBy } from '~/server/crud/answer'

export default (
  importantAnswers: Ref<Set<string>>,
  currentAnswer: AnswerWithBlockedBlockedBy,
) => {
  const isAnswerImportant = computed(() => {
    return importantAnswers.value.has(currentAnswer.msgid)
  })

  function removeImportantAnswer() {
    importantAnswers.value.delete(currentAnswer.msgid)
  }

  function toggleImportantAnswer() {
    if (isAnswerImportant.value) {
      removeImportantAnswer()
    } else {
      importantAnswers.value.add(currentAnswer.msgid)
    }
  }

  return {
    isAnswerImportant,
    toggleImportantAnswer,
    removeImportantAnswer,
  } as const
}
