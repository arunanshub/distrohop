export const useAnswersStore = defineStore('answers', {
  state: () => ({
    collectedAnswers: new Set<string>(),
    importantAnswers: new Set<string>(),
  }),
  actions: {
    addAnswer(answer: string) {
      this.collectedAnswers.add(answer)
    },
    addImportantAnswer(answer: string) {
      this.importantAnswers.add(answer)
    },

    removeAnswer(answer: string) {
      this.collectedAnswers.delete(answer)
    },
    removeImportantAnswer(answer: string) {
      this.importantAnswers.delete(answer)
    },

    hasAnswer(answer: string) {
      return this.collectedAnswers.has(answer)
    },
    hasImportantAnswer(answer: string) {
      return this.importantAnswers.has(answer)
    },

    clearAnswers() {
      this.collectedAnswers.clear()
    },
    clearImportantAnswers() {
      this.importantAnswers.clear()
    },
  },
  getters: {
    answersArray({ collectedAnswers }) {
      return [...collectedAnswers]
    },
    importantAnswersArray({ importantAnswers }) {
      return [...importantAnswers]
    },
  },
})
