import { atom } from "jotai"

export const answerAtom = atom<string[]>([])

// just for experiment
export const counterAtom = atom(0)

const answerStore = {
  answerAtom,
  counterAtom,
}

export default answerStore
