"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Question } from "../actions"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/stores/answer"
import { useMemo } from "react"

export default function AnswerRadioGroup({ question }: { question: Question }) {
  const { addSelectedAnswer, selectedAnswers, removeSelectedAnswer } =
    useAnswerStore()

  // Find the selected answer for this question by checking if any of the
  // possible answers is in the selectedAnswers set
  const selectedAnswer = useMemo(
    () =>
      question.answers.find((answer) => selectedAnswers.has(answer.msgid))
        ?.msgid,
    [question.answers, selectedAnswers],
  )

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        className="flex flex-col gap-3"
        value={selectedAnswer}
        onValueChange={(value) => {
          // If there's already a selected answer, remove it
          if (selectedAnswer) {
            removeSelectedAnswer(selectedAnswer)
          }
          // Add the new selection
          addSelectedAnswer(value)
        }}
      >
        {question.answers.map((answer) => (
          <div key={answer.msgid} className="flex items-center gap-2">
            <RadioGroupItem
              id={answer.msgid}
              value={answer.msgid}
              className="size-7"
            />
            <Label className="text-base" htmlFor={answer.msgid}>
              {answer.msgid}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
