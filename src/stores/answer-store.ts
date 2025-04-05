import { createStore } from "zustand"

export type AnswerState = {
  sections: string[]
  selectedAnswers: string[]
}

export type AnswerActions = {
  // initialize the store
  initSections: (sections: string[]) => void
  addSelectedAnswer: (answer: string) => void
  removeSelectedAnswer: (answer: string) => void
}

export type AnswerStore = AnswerState & AnswerActions

const defaultInitState: AnswerState = {
  sections: [],
  selectedAnswers: [],
}

export function createAnswerStore(initState: AnswerState = defaultInitState) {
  return createStore<AnswerStore>()((set) => ({
    ...initState,

    initSections: (sections) => {
      set({
        sections,
      })
    },

    addSelectedAnswer: (answer) => {
      set((state) => ({
        selectedAnswers: [...state.selectedAnswers, answer],
      }))
    },

    removeSelectedAnswer: (answer) => {
      set((state) => ({
        selectedAnswers: state.selectedAnswers.filter((a) => a !== answer),
      }))
    },
  }))
}
