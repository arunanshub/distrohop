import { atom } from "jotai"

export const selectedAnswersAtom = atom<Set<string>>(new Set<string>())

export const importantAnswersAtom = atom<Set<string>>(new Set<string>())
