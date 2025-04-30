import { useMemo } from "react"

export default function useCheckedAnswer({
  answers,
  selectedAnswers,
}: {
  answers: string[]
  selectedAnswers: string[]
}) {
  const answersSet = useMemo(() => new Set(answers), [answers])
  const selectedAnswersSet = useMemo(
    () => new Set(selectedAnswers),
    [selectedAnswers],
  )

  const uncheckedAnswers = useMemo(() => {
    return Array.from(selectedAnswersSet.difference(answersSet))
  }, [answersSet, selectedAnswersSet])

  return {
    answersSet,
    selectedAnswersSet,
    uncheckedAnswers,
  }
}
