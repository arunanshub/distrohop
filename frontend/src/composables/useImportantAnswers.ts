import { type Answer } from '~/types'

export default (importantAnswers: Ref<Set<string>>, currentAnswer: Answer) => {
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
