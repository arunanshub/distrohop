import { createStore } from "zustand"

export type AnswerStore = {
  selectedAnswers: Set<string>
  importantAnswers: Set<string>
  addSelectedAnswer: (answer: string) => void
  removeSelectedAnswer: (answer: string) => void
  addImportantAnswer: (answer: string) => void
  removeImportantAnswer: (answer: string) => void
}

export function createAnswerStore() {
  return createStore<AnswerStore>()((set) => ({
    selectedAnswers: new Set(),
    importantAnswers: new Set(),
    addSelectedAnswer: (answer) => {
      set((state) => ({
        selectedAnswers: new Set(state.selectedAnswers).add(answer),
      }))
    },
    removeSelectedAnswer: (answer) => {
      set((state) => {
        const newSet = new Set(state.selectedAnswers)
        newSet.delete(answer)
        return { selectedAnswers: newSet }
      })
    },
    addImportantAnswer: (answer) => {
      set((state) => {
        const newSet = new Set(state.importantAnswers)
        newSet.add(answer)
        return { importantAnswers: newSet }
      })
    },
    removeImportantAnswer: (answer) => {
      set((state) => {
        const newSet = new Set(state.importantAnswers)
        newSet.delete(answer)
        return { importantAnswers: newSet }
      })
    },
  }))
}
