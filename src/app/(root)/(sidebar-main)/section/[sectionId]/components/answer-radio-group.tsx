"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Answer, Question } from "../actions"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import ConflictingAnswersList from "./conflicting-answers-list"
import { useAnswerStatus, useSelectedAnswer } from "@/hooks/answers"
import { useCurrentSectionStatus } from "@/hooks/sections"
import { useEffect } from "react"
import MarkAsImportantButton from "./mark-as-important-button"

export default function AnswerRadioGroup({ question }: { question: Question }) {
  const addAnswer = useAnswerStore((store) => store.addAnswer)
  const removeAnswer = useAnswerStore((store) => store.removeAnswer)

  // which answer is currently selected
  const { selectedAnswer } = useSelectedAnswer(question)
  const { markSectionAsVisited } = useCurrentSectionStatus()

  useEffect(() => {
    if (selectedAnswer) {
      markSectionAsVisited()
    }
  }, [selectedAnswer, markSectionAsVisited])

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        className="flex flex-col gap-3"
        value={selectedAnswer ?? null}
        onValueChange={(value) => {
          if (value) {
            for (const answer of question.answers) {
              removeAnswer(answer.msgid)
            }
            addAnswer(value)
          }
        }}
      >
        {question.answers.map((answer) => (
          <div key={answer.msgid}>
            <div className="flex flex-col gap-2">
              <AnswerRadio answer={answer} />
              <ConflictingAnswersList answer={answer} />
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function AnswerRadio({ answer }: { answer: Answer }) {
  const { isAnswerSelected } = useAnswerStatus(answer.msgid)

  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem
        id={answer.msgid}
        value={answer.msgid}
        className="size-7"
      />
      <Label className="text-base" htmlFor={answer.msgid}>
        {answer.msgid}
      </Label>

      {isAnswerSelected && <MarkAsImportantButton answer={answer} />}
    </div>
  )
}
