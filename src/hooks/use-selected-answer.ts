import { useMemo } from "react"

export default function useSelectedAnswer(
  answers: string[],
  selectedAnswers: string[],
) {
  const answersSet = useMemo(() => new Set(answers), [answers])
  const selectedAnswersSet = useMemo(
    () => new Set(selectedAnswers),
    [selectedAnswers],
  )

  const currentlySelectedAnswer = useMemo(() => {
    return answersSet.intersection(selectedAnswersSet).values().next().value
  }, [answersSet, selectedAnswersSet])

  return {
    answersSet,
    selectedAnswersSet,
    currentlySelectedAnswer,
  }
}
