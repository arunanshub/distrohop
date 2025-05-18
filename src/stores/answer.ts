import { atom, useAtom } from "jotai"

export const selectedAnswersAtom = atom<Set<string>>(new Set<string>())

export const importantAnswersAtom = atom<Set<string>>(new Set<string>())

export function useAnswerStore() {
  const [selectedAnswers, setSelectedAnswers] = useAtom(selectedAnswersAtom)
  const [importantAnswers, setImportantAnswers] = useAtom(importantAnswersAtom)

  function addSelectedAnswer(answer: string) {
    setSelectedAnswers((prev) => {
      const newSet = new Set(prev)
      newSet.add(answer)
      return newSet
    })
  }
  function removeSelectedAnswer(answer: string) {
    setSelectedAnswers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(answer)
      return newSet
    })
  }

  function addImportantAnswer(answer: string) {
    setImportantAnswers((prev) => {
      const newSet = new Set(prev)
      newSet.add(answer)
      return newSet
    })
  }
  function removeImportantAnswer(answer: string) {
    setImportantAnswers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(answer)
      return newSet
    })
  }

  return {
    selectedAnswers,
    addSelectedAnswer,
    removeSelectedAnswer,

    importantAnswers,
    addImportantAnswer,
    removeImportantAnswer,
  }
}
