"use client"

import useSelectedAnswer from "@/hooks/use-selected-answer"
import AnswerRadioGroup from "../answer-radio-group"
import { useAnswerStore } from "@/components/providers/answer-store-provider"

type RadioGroupProps = {
  answers: {
    msgid: string
    mediaSourcePath: string | null
  }[]
}

export default function RadioGroup({ answers }: RadioGroupProps) {
  const answerStore = useAnswerStore((store) => store)
  const { currentlySelectedAnswer } = useSelectedAnswer(
    answers.map((answer) => answer.msgid),
    answerStore.selectedAnswers,
  )

  function handleSelectedAnswer(answer: string) {
    // first remove the previously selected answer that is now replaced with a new answer
    if (currentlySelectedAnswer) {
      answerStore.removeSelectedAnswer(currentlySelectedAnswer)
    }
    // then select and add the new answer
    answerStore.addSelectedAnswer(answer)
  }

  return (
    <AnswerRadioGroup
      answers={answers}
      onValueChange={(value) => handleSelectedAnswer(value)}
      selectedAnswer={currentlySelectedAnswer}
    />
  )
}
