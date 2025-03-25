import { createStore } from "zustand"

export type AnswerState = {
  sections: string[]
}

export type AnswerActions = {
  // initialize the store
  initSections: (sections: string[]) => void
}

export type AnswerStore = AnswerState & AnswerActions

const defaultInitState: AnswerState = {
  sections: [],
}

export function createAnswerStore(initState: AnswerState = defaultInitState) {
  return createStore<AnswerStore>()((set) => ({
    ...initState,

    initSections: (sections) => {
      set({
        sections,
      })
    },
  }))
}
