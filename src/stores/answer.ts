import { createStore } from "zustand"

export type AnswerStore = {
  // key value pairs of selected answers and whether they are important
  answers: Map<string, boolean>

  addAnswer: (answer: string) => void
  removeAnswer: (answer: string) => void
  markAsImportantAnswer: (answer: string) => void
  unmarkAsImportantAnswer: (answer: string) => void
}

export function createAnswerStore() {
  return createStore<AnswerStore>()((set) => ({
    answers: new Map(),
    addAnswer: (answer) => {
      set((state) => {
        const newMap = new Map(state.answers)
        newMap.set(answer, false)
        return { answers: newMap }
      })
    },
    markAsImportantAnswer: (answer) => {
      set((state) => {
        const newMap = new Map(state.answers)
        newMap.set(answer, true)
        return { answers: newMap }
      })
    },
    unmarkAsImportantAnswer: (answer) => {
      set((state) => {
        const newMap = new Map(state.answers)
        newMap.set(answer, false)
        return { answers: newMap }
      })
    },
    removeAnswer: (answer) => {
      set((state) => {
        const newMap = new Map(state.answers)
        newMap.delete(answer)
        return { answers: newMap }
      })
    },
  }))
}
