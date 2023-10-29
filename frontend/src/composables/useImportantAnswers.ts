export default (importantAnswers: Ref<string[]>) => {
  function isImportantAnswer(answer: string) {
    return importantAnswers.value.includes(answer)
  }

  function removeImportantAnswer(answer: string) {
    importantAnswers.value = importantAnswers.value.filter(
      (ans) => ans !== answer
    )
  }

  function toggleImportantAnswer(answer: string) {
    if (isImportantAnswer(answer)) {
      removeImportantAnswer(answer)
    } else {
      importantAnswers.value.push(answer)
    }
  }

  return {
    toggleImportantAnswer,
    isImportantAnswer,
    removeImportantAnswer,
  }
}
