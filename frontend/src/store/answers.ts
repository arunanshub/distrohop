export const useAnswersStore = defineStore('answers', {
  state: () => ({
    collectedAnswers: new Set<string>(),
  }),
  actions: {
    add(answer: string) {
      this.collectedAnswers.add(answer)
    },
    remove(answer: string) {
      this.collectedAnswers.delete(answer)
    },
    has(answer: string) {
      return this.collectedAnswers.has(answer)
    },
    clear() {
      this.collectedAnswers.clear()
    },
  },
  getters: {
    answersArray(state) {
      return [...state.collectedAnswers]
    },
  },
})
