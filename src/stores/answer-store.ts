import { createStore } from "zustand"

export type AnswerState = {
  answers: Set<string>
  // answers selected by the user
  selectedAnswers: Set<string>
  // answers marked as important
  importantAnswers: Set<string>
}

export type AnswerActions = {
  // initialize the store
  initAnswers: (answers: string[]) => void
  // add an answer to the selected answers
  addSelectedAnswer: (answer: string) => void
  // add an answer to the important answers
  addImportantAnswer: (answer: string) => void
  // remove an answer from the selected answers
  removeSelectedAnswer: (answer: string) => void
  // remove an answer from the important answers
  removeImportantAnswer: (answer: string) => void
  // clear all selected answers
  clearSelectedAnswers: () => void
  // clear all important answers
  clearImportantAnswers: () => void
}

export type AnswerStore = AnswerState & AnswerActions

const defaultInitState: AnswerState = {
  answers: new Set(),
  selectedAnswers: new Set(),
  importantAnswers: new Set(),
}

export function createAnswerStore(initState: AnswerState = defaultInitState) {
  return createStore<AnswerStore>()((set) => ({
    ...initState,

    initAnswers: (answers) => {
      set({
        answers: new Set(answers),
      })
    },
    addSelectedAnswer: (answer) => {
      set((state) => ({
        selectedAnswers: state.selectedAnswers.add(answer),
      }))
    },
    addImportantAnswer: (answer) => {
      set((state) => ({
        importantAnswers: state.importantAnswers.add(answer),
      }))
    },
    removeSelectedAnswer: (answer) => {
      set(({ selectedAnswers }) => {
        selectedAnswers.delete(answer)
        return { selectedAnswers }
      })
    },
    removeImportantAnswer: (answer) => {
      set(({ importantAnswers }) => {
        importantAnswers.delete(answer)
        return { importantAnswers }
      })
    },
    clearSelectedAnswers: () => set({ selectedAnswers: new Set() }),
    clearImportantAnswers: () => set({ importantAnswers: new Set() }),
  }))
}
