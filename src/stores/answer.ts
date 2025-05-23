import { atom, useAtom } from "jotai"
import { useCallback } from "react"

const selectedAnswersAtom = atom<Set<string>>(new Set<string>())

const importantAnswersAtom = atom<Set<string>>(new Set<string>())

export function useAnswerStore() {
  const [selectedAnswers, setSelectedAnswers] = useAtom(selectedAnswersAtom)
  const [importantAnswers, setImportantAnswers] = useAtom(importantAnswersAtom)

  const addSelectedAnswer = useCallback(
    (answer: string) => {
      setSelectedAnswers((prev) => {
        const newSet = new Set(prev)
        newSet.add(answer)
        return newSet
      })
    },
    [setSelectedAnswers],
  )

  const removeSelectedAnswer = useCallback(
    (answer: string) => {
      setSelectedAnswers((prev) => {
        const newSet = new Set(prev)
        newSet.delete(answer)
        return newSet
      })
    },
    [setSelectedAnswers],
  )

  const addImportantAnswer = useCallback(
    (answer: string) => {
      setImportantAnswers((prev) => {
        const newSet = new Set(prev)
        newSet.add(answer)
        return newSet
      })
    },
    [setImportantAnswers],
  )

  const removeImportantAnswer = useCallback(
    (answer: string) => {
      setImportantAnswers((prev) => {
        const newSet = new Set(prev)
        newSet.delete(answer)
        return newSet
      })
    },
    [setImportantAnswers],
  )

  return {
    selectedAnswers,
    addSelectedAnswer,
    removeSelectedAnswer,

    importantAnswers,
    addImportantAnswer,
    removeImportantAnswer,
  }
}
