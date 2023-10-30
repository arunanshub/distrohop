export default (importantAnswers: Ref<Set<string>>) => {
  function isImportantAnswer(answer: string) {
    return importantAnswers.value.has(answer)
  }

  function removeImportantAnswer(answer: string) {
    importantAnswers.value.delete(answer)
  }

  function toggleImportantAnswer(answer: string) {
    if (isImportantAnswer(answer)) {
      removeImportantAnswer(answer)
    } else {
      importantAnswers.value.add(answer)
    }
  }

  return {
    toggleImportantAnswer,
    isImportantAnswer,
    removeImportantAnswer,
  }
}
